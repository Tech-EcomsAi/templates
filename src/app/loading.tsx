import AnimatedVerticalLogo from '@/components/animatedLogo'
import './globals.css'

function Loading() {

    return (
        <main className={"loadingWrap"}>
            <AnimatedVerticalLogo />
            <div className={"bgWrap"}></div>
        </main>
    )
}

export default Loading