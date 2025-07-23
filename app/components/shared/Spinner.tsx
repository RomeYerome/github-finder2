import { useLocation } from 'react-router'
import spinner from '/spinner.gif'


const Spinner = () => {
    const location = useLocation()

    {console.log(location)}
    return (
        <div className="flex justify-center items-center mt-20">
            <img src={spinner} alt="Loading..." className="w-20 h-20" />
        </div>
    )
}

export default Spinner
