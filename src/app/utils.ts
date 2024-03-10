
export function getCSS(plainCss: any) {
    const reactCss: any = {};

    // Split the CSS by lines
    const cssLines = plainCss.split("\n").map((line: any) => line.trim());

    // Iterate over each line
    cssLines.forEach((line: any) => {
        // Skip empty lines and lines that don't contain a CSS property
        if (!line || line.indexOf(":") === -1) return;

        // Split each line into property and value
        const [property, value] = line.split(":").map((part: any) => part.trim());

        // Split property by '-' and convert to camelCase
        const propertyName = property.replace(/-([a-z])/g, (_: any, letter: any) =>
            letter.toUpperCase()
        );

        // Add property and value to reactCss object
        reactCss[propertyName] = value;
    });
    return reactCss;
}

export function cssNameToJsName(name: any) {
    var split = name.split("-");
    var output = "";
    for (var i = 0; i < split.length; i++) {
        if (i > 0 && split[i].length > 0 && !(i == 1 && split[i] == "ms")) {
            split[i] = split[i].substr(0, 1).toUpperCase() + split[i].substr(1);
        }
        output += split[i];
    }
    return output;
}
export function getInlineStyleProperties(element: any) {
    let styles: any = {};
    const list: any = document.styleSheets[0].cssRules[13];
    Object.fromEntries(
        [...list.style].map((x) => {
            if (list.style[x]) {
                styles = { ...styles, [cssNameToJsName(x)]: list.style[x] };
            }
            return [x, list.style[x]];
        })
    );
    return styles;
}


function getParentChildClassList(element: any) {
    // Base case: If element has no parent, return its own class list (if any)
    if (!element.parentElement || element.parentElement.className.includes("componentRenderer")) return element.classList ? `.${element.className}` : "";

    // Recursively get parent's class list and prepend it to current element's
    const parentClasses: any = getParentChildClassList(element.parentElement);
    //ignore element classes which are layout and __classname
    const currentClasses = (element.classList && element.className && !element.className.includes("layout") && !element.className.includes("__className")) ? element.className : "";
    return currentClasses ? (parentClasses && parentClasses != ".") ? `${parentClasses} .${currentClasses}` : "." + currentClasses : "";
}

const getBorderStyle = (styles: any) => {
    let border = "";
    border = `${styles.borderTopWidth} ${styles.borderRightWidth} ${styles.borderBottomWidth} ${styles.borderLeftWidth}`;
    delete styles.borderTopWidth; delete styles.borderRightWidth; delete styles.borderBottomWidth; delete styles.borderLeftWidth;
    delete styles.borderTopStyle; delete styles.borderRightStyle; delete styles.borderBottomStyle; delete styles.borderLeftStyle;
    delete styles.borderTopColor; delete styles.borderRightColor; delete styles.borderBottomColor; delete styles.borderLeftColor;
    delete styles.borderImageSource; delete styles.borderImageSlice; delete styles.borderImageWidth; delete styles.borderImageOutset; delete styles.borderImageRepeat;
    return border
}

const getBorderRadiusStyle = (styles: any) => {
    let borderRadius = "";
    borderRadius = `${styles.borderTopLeftRadius} ${styles.borderTopRightRadius} ${styles.borderBottomRightRadius} ${styles.borderBottomLeftRadius}`;
    delete styles.borderTopLeftRadius;
    delete styles.borderTopRightRadius;
    delete styles.borderBottomRightRadius;
    delete styles.borderBottomLeftRadius;
    return borderRadius
}

const getBorderColorStyle = (styles: any) => {
    let borderColor = "";
    borderColor = `${styles.borderTopColor} ${styles.borderRightColor} ${styles.borderBottomColor} ${styles.borderLeftColor}`;
    delete styles.borderTopColor; delete styles.borderRightColor; delete styles.borderBottomColor; delete styles.borderLeftColor;
    return borderColor
}

const getPaddingStyle = (styles: any) => {
    const padding = `${styles.paddingTop} ${styles.paddingRight} ${styles.paddingLeft} ${styles.paddingBottom}`;
    delete styles.paddingTop; delete styles.paddingRight; delete styles.paddingBottom; delete styles.paddingLeft;
    return padding
}

const getMarginStyle = (styles: any) => {
    const margin = `${styles.marginTop || 0} ${styles.marginRight || 0} ${styles.marginLeft || 0} ${styles.marginBottom || 0}`;
    delete styles.marginTop; delete styles.marginRight; delete styles.marginBottom; delete styles.marginLeft;
    return margin
}

const getOverflowStyle = (styles: any) => {
    let overflowx = "overflowX" in styles ? styles["overflowX"] : styles.overflow;
    let overflowy = "overflowY" in styles ? styles["overflowY"] : styles.overflow;
    const overflow = `${overflowx || "unset"} ${overflowy || "unset"}`;
    delete styles["overflowX"];
    delete styles["overflowY"];
    return overflow
}

export function getClassStyleProperties(element: any) {
    let styles: any = {};
    let classList = getParentChildClassList(element);
    console.log(`classes for ${element.tagName}:`, classList)
    let CSSRuleList: any = null;

    for (let index = 0; index < document.styleSheets.length; index++) {
        if (document.styleSheets[index].href?.includes("[category]/[component]")) {
            CSSRuleList = document.styleSheets[index].cssRules;
        }
    }

    let currentStyleList: any = null;

    if (classList && Boolean(CSSRuleList?.length)) {
        for (let index = 0; index < CSSRuleList?.length; index++) {
            if (CSSRuleList[index].selectorText == classList) {
                currentStyleList = CSSRuleList[index].style;
            }
        }
    }
    if (currentStyleList) {
        Object.fromEntries(
            [...currentStyleList].map((x) => {
                if (currentStyleList[x]) {
                    styles = { ...styles, [cssNameToJsName(x)]: currentStyleList[x] };
                }
                return [x, currentStyleList[x]];
            })
        );
    }
    if (Boolean(styles)) {
        if ("paddingTop" in styles) {
            styles.padding = getPaddingStyle(styles);
        }
        if ("marginTop" in styles) {
            styles.margin = getMarginStyle(styles);
        }
        if ("borderTopWidth" in styles) {
            styles.border = getBorderStyle(styles);
        }
        if ("borderTopLeftRadius" in styles) {
            styles.borderRadius = getBorderRadiusStyle(styles);
        }
        if ("borderTopColor" in styles) {
            styles.borderColor = getBorderColorStyle(styles);
        }
        if ("overflow" in styles || "overflowX" in styles || "overflowY" in styles) {
            styles.overflow = getOverflowStyle(styles);
        }
    }
    return styles;
}

export function converter(dom: any) {
    if (!dom) return
    if (dom.nodeType === Node.TEXT_NODE) {
        //  add only if value is not empty
        if (dom.nodeValue && dom.nodeValue.trim() != "") return dom.nodeValue;
    }
    if (dom.nodeType === Node.DOCUMENT_NODE) dom = dom.documentElement;
    let obj: any = {};
    //  add only if value is not empty
    if (dom.nodeValue && dom.nodeValue.trim() != "") obj.nodeType = dom.nodeType;
    if (dom.nodeType === Node.ELEMENT_NODE) {
        let props = {};
        let tagName = dom.tagName.toLowerCase();
        let styles = getClassStyleProperties(dom);
        for (let i = 0, len = dom.attributes.length; i < len; ++i) {
            const attribute = dom.attributes[i];
            if (attribute.value.includes("background-image")) {
                styles.backgroundImage = dom.style.backgroundImage;
            } else {
                if (attribute.name !== "class") props = { ...props, [attribute.name]: attribute.value };
            }
        }
        //  remove attributes if is empty
        // if (props.length == 0) delete props;
        let children = [];
        for (let child = dom.firstChild; child; child = child.nextSibling) {
            //  add only if value is not NULL
            var childVal = converter(child);
            if (childVal) {
                if (child.nodeType === Node.TEXT_NODE) {
                    props = { ...props, ["text"]: childVal };
                } else {
                    children.push(childVal);
                }
            }
        }

        obj = { props, component: tagName, styles, children };

    } else {
        //  add only if value is not empty
        if (dom.nodeValue && dom.nodeValue.trim() != "") obj.nodeValue = dom.nodeValue;
    }
    if (obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) {
        //  do nothing
    } else return obj;
}