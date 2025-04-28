import { Outlet } from "react-router";
import '../../App.css'

const Root = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;