import { AiOutlineCheck, AiOutlineClose, AiFillEdit, AiFillStar } from 'react-icons/ai';
import editionAdminService from "../../../services/admin/editionAdmin.service";
import AuthService from "../../../services/auth/auth.service";
import style from "./Administration.module.scss";
import { FaTrashRestore } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { MDBDataTableV5 } from 'mdbreact';
import { BsTrash } from 'react-icons/bs';

function Administration() {

    const url = AuthService.getUrl();
    const [usersForRender, setUsersForRender] = useState([]);
    const [posts, setPosts] = useState([]);
    const [toggleMenu, setToggleMenu] = useState(true);
    const [toggle2Menu, setToggle2Menu] = useState(false);
    const [toggle3Menu, setToggle3Menu] = useState(false);
    const [toggle4Menu, setToggle4Menu] = useState(false);

    const [toggle, setToggle] = useState(true);
    const [toggle2, setToggle2] = useState(false);
    const [toggle3, setToggle3] = useState(false);
    const [toggle4, setToggle4] = useState(false);

    const [statistiqueToday, setStatistiqueToday] = useState(0);
    const [statistiqueMonth, setStatistiqueMonth] = useState(0);
    const [statistiqueTotal, setStatistiqueTotal] = useState(0);



    const navigate = useNavigate();

    function nav(path) {
        navigate(path)
    }


    let changeStyleMenu = (btn) => {
        switch (btn) {
            case 1:
                setToggleMenu(true);
                setToggle2Menu(false);
                setToggle3Menu(false);
                setToggle4Menu(false);


                setToggle(true);
                setToggle2(false);
                setToggle3(false);
                setToggle4(false);
                getValidation();
                break;
            case 2:
                setToggleMenu(false);
                setToggle2Menu(true);
                setToggle3Menu(false);
                setToggle4Menu(false);

                setToggle(true);
                setToggle2(false);
                setToggle3(false);
                setToggle4(false);
                getUpdate();
                break;
            case 3:
                setToggleMenu(false);
                setToggle2Menu(false);
                setToggle3Menu(true);
                setToggle4Menu(false);


                setToggle(true);
                setToggle2(false);
                setToggle3(false);
                setToggle4(false);
                getListUser();
                break;
            case 4:
                setToggleMenu(false);
                setToggle2Menu(false);
                setToggle3Menu(false);
                setToggle4Menu(true);
                break;
            default:
        }
    };

    console.log('weeesh', toggle3);

    let changeStyle = (btn) => {
        switch (btn) {
            case 1:
                setToggle(true);
                setToggle2(false);
                setToggle3(false);
                setToggle4(false);
                if (toggleMenu) { getValidation(); }
                if (toggle2Menu) { getUpdate(); }
                if (toggle3Menu) { getListUser(); }
                break;
            case 2:
                setToggle2(true);
                setToggle(false);
                setToggle3(false);
                setToggle4(false);
                if (toggleMenu) { getLunch(); }
                if (toggle2Menu) { getUpdateListDelete(); }
                else { getListAdmin() }

                break;
            case 3:
                setToggle3(true);
                setToggle(false);
                setToggle2(false);
                setToggle4(false);
                if (toggleMenu) { getTrash(); }
                if (toggle3Menu) {
                    getStatistiqueToday();
                    getStatistiqueMonth();
                    getStatistiqueTotal();

                }

                break;
            case 4:
                setToggle3(false);
                setToggle(false);
                setToggle2(false);
                setToggle4(true);
                if (toggleMenu) { getPromoted(); }
                break;
            default:
        }
    };


    useEffect(() => {
        fetch(url + 'launchDateAdmin/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);
            });
    }, []);



    let getLunch = () => {
        fetch(url + 'ecosystem/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);
                getPromotedProjectLenght();
            });
    };

    let getValidation = () => {
        fetch(url + 'launchDateAdmin/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);

            });
    };

    let getTrash = () => {
        fetch(url + 'trashAdmin/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);

            });
    };

    let deletePost = (postId) => {
        fetch(url + `trashDef/${postId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((res) => {
                var postIndex = posts.findIndex(function (o) {
                    return o._id === postId;
                });
                if (postIndex !== -1) {
                    setPosts(posts.filter((item) => item.id !== postId));
                    getTrash();
                }
            });
    };





    let getPromoted = () => {
        fetch(url + 'getPromotedProject/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);
            });
    };

    let getPromotedProjectLenght = () => {
        fetch(url + 'getPromotedProjectLenght/')
            .then((res) => res.json())
            .then((res) => {
                editionAdminService.initPromotedProjectLenght();
                editionAdminService.setPromotedProjectLenght(res);
            });
    };


    let validProject = (postId, status, remove) => {
        fetch(url + `adminEdit/${postId}`, {
            method: "Put",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: status, delete: remove })
        })
            .then((res) => res.json())
            .then((res) => {

                if (toggle) {
                    getValidation();
                }
                if (toggle2) {
                    getLunch();
                }
                if (toggle3) {
                    getTrash();
                }
            });
    };





    let promotedChangeRequest = (postId, promotedStatus) => {

        if (promotedStatus) {
            editionAdminService.setPromotedProjectLenght(editionAdminService.getPromotedProjectLenght() - 1);
        }

        if (!promotedStatus) {

            editionAdminService.setPromotedProjectLenght(editionAdminService.getPromotedProjectLenght() + 1);
        }
        if (editionAdminService.getPromotedProjectLenght() <= 8 || promotedStatus || toggle4) {



            fetch(url + `promotedChange/${postId}`, {
                method: "Put",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ promotedStatus: promotedStatus })

            })
                .then((res) => res.json())

                .then((res) => {

                    console.log('hmmmm', editionAdminService.getPromotedProjectLenght());

                    if (toggle2) {
                        console.log('toggle2 Avant', editionAdminService.getPromotedProjectLenght());
                        getPromotedProjectLenght();
                        getLunch();

                    }
                    if (toggle4) {
                        getPromoted();
                        getPromotedProjectLenght();
                    }
                });

        }

        else {
            alert('You can only promote 8 projects at the same time');
        }
    };


    let getUpdate = () => {
        fetch(url + 'updateList/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);
            });
    };



    let getUpdateListDelete = () => {
        fetch(url + 'updateListDelete/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);
            });
    };


    let updateDelete = (postId, deleteValeur) => {


        fetch(url + `updateDelete/${postId}`, {
            method: "Put",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ delete: deleteValeur })
        })
            .then((res) => res.json())
            .then((res) => {
                if (toggle) { getUpdate(); }
                if (toggle2) { getUpdateListDelete(); }
            });
    };



    let updateDeleteDef = (postId) => {
        fetch(url + `updateDeleteDef/${postId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((res) => {
                var postIndex = posts.findIndex(function (o) {
                    return o._id === postId;
                });
                if (postIndex !== -1) {
                    setPosts(posts.filter((item) => item.id !== postId));
                    getUpdateListDelete();
                }
            });
    };



    let getListUser = () => {
        fetch(url + 'listUser/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);
            });
    };

    let getListAdmin = () => {
        fetch(url + 'listAdmin/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);
            });
    };

    let getStatistiqueToday = () => {
        fetch(url + 'statistiqueToday/')
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setStatistiqueToday(res)
                /* setPosts(res); */
            });
    };

    let getStatistiqueMonth = () => {
        fetch(url + 'statistiqueMonth/')
            .then((res) => res.json())
            .then((res) => {
                setStatistiqueMonth(res)
                /* setPosts(res); */
            });
    };

    let getStatistiqueTotal = () => {
        fetch(url + 'statistiqueTotal/')
            .then((res) => res.json())
            .then((res) => {
                setStatistiqueTotal(res)
                /* setPosts(res); */
            });
    };



    useEffect(() => {
        let postsArray = JSON.parse(JSON.stringify(posts));
        let userData = [];
        if (toggleMenu || toggle2Menu) {
            postsArray.map((item, index) => {

                item.email = (
                    <div style={{ fontSize: "1.2em" }}>{item.emailCrea}</div>
                );
                item.action = (
                    <div style={{ display: "flex" }}>

                        {toggleMenu &&
                            <div>
                                {toggle && <AiOutlineCheck size={32} style={{
                                    cursor: "pointer",
                                    color: "green",
                                }} onClick={() => validProject(posts[index]._id, true, false)} />}

                                {toggle && <AiOutlineClose size={32} style={{
                                    cursor: "pointer",
                                    color: "red",
                                }} onClick={() => validProject(posts[index]._id, false, true)} />}

                                {toggle && <AiFillEdit size={32} style={{
                                    cursor: "pointer",
                                    color: "blue",
                                }} onClick={() => nav(`/editionCoin/${posts[index]._id}`)} />}


                                {toggle2 && <div>{!posts[index].promotedStatus && <AiFillStar size={32}
                                    style={{
                                        cursor: "pointer",
                                        color: "black",
                                    }} onClick={() => promotedChangeRequest(posts[index]._id, posts[index].promotedStatus)} />}</div>}

                                {(toggle2 && !posts[index].promotedStatus) && <AiOutlineClose size={32} style={{
                                    cursor: "pointer",
                                    color: "red",
                                }} onClick={() => validProject(posts[index]._id, false, false)} />}


                                {toggle2 && <div>{posts[index].promotedStatus && <AiFillStar size={32}
                                    style={{
                                        cursor: "pointer",
                                        color: "yellow",
                                    }} onClick={() => promotedChangeRequest(posts[index]._id, posts[index].promotedStatus)} />}</div>}


                                {toggle3 && <FaTrashRestore size={32} style={{
                                    cursor: "pointer",
                                    color: "green",
                                }} onClick={() => validProject(posts[index]._id, false, false)} />}

                                {toggle3 && < BsTrash size={32} style={{
                                    cursor: "pointer",
                                    color: "red",
                                }} onClick={() => deletePost(posts[index]._id)} />}


                                {toggle4 && <div>{!posts[index].promotedStatus && <AiFillStar size={32}
                                    style={{
                                        cursor: "pointer",
                                        color: "black",
                                    }} onClick={() => promotedChangeRequest(posts[index]._id, posts[index].promotedStatus)} />}</div>}



                                {toggle4 && <div>{posts[index].promotedStatus && <AiFillStar size={32}
                                    style={{
                                        cursor: "pointer",
                                        color: "yellow",
                                    }} onClick={() => promotedChangeRequest(posts[index]._id, posts[index].promotedStatus)} />}</div>}


                            </div>}
                        {toggle2Menu &&
                            <div>
                                {toggle && <AiFillEdit size={32} style={{
                                    cursor: "pointer",
                                    color: "green",
                                }} onClick={() => nav(`/editionUser/${posts[index]._id}`)} />}
                                {toggle && <AiOutlineClose size={32} style={{
                                    cursor: "pointer",
                                    color: "red",
                                }} onClick={() => updateDelete(posts[index]._id, true)} />}

                                {toggle2 && <FaTrashRestore size={32} style={{
                                    cursor: "pointer",
                                    color: "green",
                                }} onClick={() => updateDelete(posts[index]._id, false)} />}

                                {toggle2 && < BsTrash size={32} style={{
                                    cursor: "pointer",
                                    color: "red",
                                }} onClick={() => updateDeleteDef(posts[index]._id)} />}

                            </div>}
                    </div>


                );
                item.image = (
                    <img style={{ height: "100%", width: "95px", float: "left" }} src={url + posts[index].image} alt="img" />
                );
                userData.push(item);
            });

        }

        if (toggle3Menu) {
            postsArray.map((item, index) => {


                item.createdOn = (
                    <div style={{ fontSize: "1.2em" }}>Date: {item.createdOn.substr(0, 10)}  Heure: {item.createdOn.substr(11, 8)}</div>
                );
                userData.push(item);
            });

        }


        setUsersForRender(userData);
    }, [posts]);

    const data = {
        columns: [
            {
                label: 'Créateur',
                field: 'email',
                sort: 'asc',
                width: 150
            },
            {
                label: '',
                field: 'image',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Symbol',
                field: 'symbol',
                sort: 'asc',
                width: 100
            },
            {
                label: 'LaunchDate',
                field: 'launchDate',
                sort: 'asc',
                width: 150
            }, {
                label: 'Action',
                field: 'action',
                width: 100
            },
        ],

        rows: usersForRender,
    };


    const dataUsers = {
        columns: [
            {
                label: 'Username',
                field: 'username',
                sort: 'asc',
                width: 150
            },
            {
                label: 'Email',
                field: 'email',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Date de création',
                field: 'createdOn',
                sort: 'asc',
                width: 200
            }
        ],

        rows: usersForRender,
    };

    return (
        <div className="container">

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            {toggleMenu &&
                                <a className="nav-link" href="#" onClick={() => changeStyleMenu(1)}> <span className={style.administration_filterMainColor}>Projets</span></a>
                            }
                            {!toggleMenu &&
                                <a className="nav-link" href="#" onClick={() => changeStyleMenu(1)}> <span>Projets</span></a>
                            }

                        </li>
                        <li className="nav-item ">
                            {toggle2Menu &&
                                <a className="nav-link" href="#" onClick={() => changeStyleMenu(2)}> <span className={style.administration_filterMainColor}>Update</span></a>
                            }
                            {!toggle2Menu &&
                                <a className="nav-link" href="#" onClick={() => changeStyleMenu(2)}> <span>Update</span></a>
                            }
                        </li>
                        <li className="nav-item ">
                            {toggle3Menu &&
                                <a className="nav-link" href="#" onClick={() => changeStyleMenu(3)}> <span className={style.administration_filterMainColor}>Utilisateurs</span></a>
                            }
                            {!toggle3Menu &&
                                <a className="nav-link" href="#" onClick={() => changeStyleMenu(3)}> <span>Utilisateurs</span></a>
                            }
                        </li>

                        <li className="nav-item ">
                            {toggle4Menu &&
                                <a className="nav-link" href="#" onClick={() => changeStyleMenu(4)}> <span className={style.administration_filterMainColor}>Promotions</span></a>
                            }
                            {!toggle4Menu &&
                                <a className="nav-link" href="#" onClick={() => changeStyleMenu(4)}> <span>Promotions</span></a>
                            }
                        </li>

                    </ul>

                </div>
            </nav>

            {toggleMenu &&
                <div className={style.administration_filterContainer}>
                    <div className={toggle ? style.administration_filterOneClick : style.administration_filterOne} onClick={() => changeStyle(1)}>
                        <p className={style.administration__filterTitle}>À valider</p>
                    </div>
                    <div className={toggle2 ? style.administration_filterClick : style.administration_filter} onClick={() => changeStyle(2)}> <p className={style.administration__filterTitle}>En ligne</p> </div>
                    <div className={toggle4 ? style.administration_filterClick : style.administration_filter} onClick={() => changeStyle(4)}> <p className={style.administration__filterTitle}>Promoted</p> </div>
                    <div className={toggle3 ? style.administration_filterClick : style.administration_filter} onClick={() => changeStyle(3)}> <p className={style.administration__filterTitle}>Corbeille</p> </div>
                </div>
            }

            {toggle2Menu &&
                <div className={style.administration_filterContainer}>
                    <div className={toggle ? style.administration_filterOneClick : style.administration_filterOne} onClick={() => changeStyle(1)}>
                        <p className={style.administration__filterTitle}>À valider</p>
                    </div>
                    <div className={toggle2 ? style.administration_filterClick : style.administration_filter} onClick={() => changeStyle(2)}> <p className={style.administration__filterTitle}>Corbeille</p> </div>
                </div>
            }

            {toggle3Menu &&
                <div className={style.administration_filterContainer}>
                    <div className={toggle ? style.administration_filterOneClick : style.administration_filterOne} onClick={() => changeStyle(1)}>
                        <p className={style.administration__filterTitle}>Liste users</p>
                    </div>
                    <div className={toggle2 ? style.administration_filterClick : style.administration_filter} onClick={() => changeStyle(2)}>
                        <p className={style.administration__filterTitle}>Liste admins</p>
                    </div>
                    <div className={toggle3 ? style.administration_filterClick : style.administration_filter} onClick={() => changeStyle(3)}>
                        <p className={style.administration__filterTitle}>Statistiques</p>
                    </div>
                    {toggle3 &&
                        <div>
                            <p> <br /><br />Nombres d'utilisateurs inscrit aujourd'hui :  {statistiqueToday}</p>
                            <p> <br />Nombres d'utilisateurs inscrit ce mois-ci :  {statistiqueMonth}</p>
                            <p> <br />Nombres d'utilisateurs Total:  {statistiqueTotal}</p>

                        </div>
                    }

                </div>

            }


            {(toggleMenu || toggle2Menu) && <MDBDataTableV5
                dark
                responsive
                hover
                striped
                bordered
                small
                data={data}
                className={style.mbd}
                color="success"
            />}

            {toggle3Menu && (toggle || toggle2) && <MDBDataTableV5
                dark
                responsive
                hover
                striped
                bordered
                small
                data={dataUsers}
                className={style.mbd}
                color="success"
            />}
        </div >
    );
}

export default Administration;



