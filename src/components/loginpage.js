import { useNavigate } from "react-router-dom"


function LoginPage() {



    const menus = [{ name: "Librarian", image: "http://www.clker.com/cliparts/8/8/c/5/1516775828438601192librarian-clipart.hi.png", path: "/librarian" },
    { name: "User 1014", image: "https://img.favpng.com/20/23/23/library-free-content-librarian-clip-art-png-favpng-jjeEAJ3Fd7wxhmxZJShBC5jz9.jpg", path: "/user" }]


    return (<>

        <div className="login-page-container container">
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://img.freepik.com/free-vector/people-library-flat-vector-illustration_74855-6607.jpg?w=996&t=st=1671874018~exp=1671874618~hmac=f4425b7c62aaf5f23c429d13323b0e84b61982cc54fed27fc3dcf4d1bd75171c"
                                className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <h6 className="btn btn-primary d-block mx-auto mb-2" type="button">Choose Login</h6>
                            <div className="login-menus d-flex gap-3">
                                {menus.map((menu, i) => <LoginMenu key={menu.name} menu={menu} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>)
}


const LoginMenu = ({ menu }) => {
    const navigate = useNavigate();


    return (

        <div className="login-menu-wrapper" onClick={() => navigate(menu.path)}>
            <img style={{ width: "200px", height: "150px" }} src={menu.image} alt="menu image" />
            <h6 className="text-center fw-bold">{menu.name}</h6>
        </div>

    )
}




export { LoginPage }