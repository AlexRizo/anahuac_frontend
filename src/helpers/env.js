const env = () => {
    import.meta.env;

    return {
        ...import.meta.env,
    }
}

export default env;