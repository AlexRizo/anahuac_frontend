export const Article = ({ title, author, text = [], contentOrigin }) => {
    return (
        <article className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold italic">{ title }</h1>
            <h2 className="text-[22px] font-semibold italic">Por { author }</h2>
            <p className="">
                {
                    text.map((paragraph, index) => (
                        <>
                            <span key={ index }>{ paragraph }</span>
                            <br/>
                            <br/>
                        </>
                    ))
                }
            </p>
            <p>{ contentOrigin }</p>
        </article>
    )
}
