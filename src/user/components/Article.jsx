export const Article = ({ title, author, text = [], contentOrigin }) => {
    return (
        <article className="flex flex-col gap-2">
            <h1 className="text-2xl 2xl:text-3xl font-semibold italic">{ title }</h1>
            <h2 className="text-xl 2xl:text-[22px] font-semibold italic">Por { author }</h2>
            <p>
                {
                    text.map((paragraph, index) => (
                        <span key={ `article-${ index }` }>
                            { paragraph }
                            <br/>
                            <br/>
                        </span>
                    ))
                }
            </p>
            <p className="text-gray-500 text-right whitespace-pre-wrap break-words">{ contentOrigin }</p>
        </article>
    )
}
