
import { ArrowLeft } from "phosphor-react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton"
import { ScreenshotButton } from "../ScreenshotButton";
import { FormEvent, useState } from 'react';
import { LoadingIcon } from "../LoadingIcon";
import { api } from "../../../libs/api";


interface ButtonProps{
    inLoading?: boolean;
}
 
interface FeedbackContentStepProps{
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
}
export function FeedbackContentStep({
    feedbackType,
    onFeedbackRestartRequested,
    onFeedbackSent
    }: FeedbackContentStepProps){
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState('')
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)
   
 
    const feedbackTypeInfo = feedbackTypes[feedbackType]
  

    async function handleSubmitFeedback(event: FormEvent){

        event.preventDefault()

        setIsSendingFeedback(true)

        await api.post('/feedbacks',{
            type: feedbackType,
            comment,
            screenshot
        })

        setIsSendingFeedback(false)

        onFeedbackSent()
    }
    return(
        <>
        <header>
            <button 
            type="button" 
            className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
            onClick={onFeedbackRestartRequested}
            >
                <ArrowLeft weight="bold" className="w-4 h-4"/>
            </button>
            
            <span className="text-xl leading-6 flex  items-center gap-2 
              dark:text-dark-text-primary  text-light-text-primary ">
                <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt}
                className="w-6 h-6"/>
                {feedbackTypeInfo.title}</span>
            
            <CloseButton />
        </header>
        <form onSubmit={handleSubmitFeedback} className="w-full my-4">
            <textarea
            className="min-w-[304px] w-full  min-h-[96px] text-sm dark:placeholder-dark-text-secondary 
            placeholder-light-text-secondary dark:text-dark-text-secondary text-light-text-secondary
            dark:border-dark-stroke border-light-stroke  bg-transparent rounded-md focus:border-x-brand-500 
            focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none  dark:scrollbar-thumb-dark-stroke 
            scrollbar-thumb-light-stroke scrollbar-thin scrollbar-track-transparent "
            placeholder="Conte com detalhes o que está acontecendo.."
            onChange={event => setComment(event.target.value)}
            
            />
            <footer className="flex gap-2 mt-2">
                <ScreenshotButton
                    screenshot={screenshot}
                    onScreenshotTook={setScreenshot}
                    
                
                />
                <button
                    type="submit"
                    
                    disabled={comment.length === 0 || isSendingFeedback}
                    className="p-2 bg-brand-500 rounded-md  border-transparent flex-1 flex justify-center text-brand-text
                    items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-offset-2 
                    focus:ring-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors
                    disabled:opacity-50 disabled:hover:bg-brand-500"                
                >
                    {isSendingFeedback ? <LoadingIcon/> : 'Enviar feedback'}

                </button>
            </footer>

        </form>
        </>
    )
}