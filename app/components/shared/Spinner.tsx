import spinner from '/spinner.gif'

const Spinner = () => {
    return (
        <div className="flex justify-center items-center">
            <img src={spinner} alt="Loading..." className="w-12 h-12" />
        </div>
    )
}

export default Spinner
