import { MDBDataTableV5 } from 'mdbreact';
import { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineClose, AiFillEdit, AiFillStar } from 'react-icons/ai';
import editionAdminService from "../../../services/admin/editionAdmin.service";

import { FaTrashRestore } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { Menu } from 'semantic-ui-react'
// import { useHistory } from 'react-router-dom';
/* import { useNavigate } from 'react-router-dom'; */
import style from "./Administration.module.scss";

function Administration() {

    const [posts, setPosts] = useState([]);
    const [usersForRender, setUsersForRender] = useState([]);
    const [toggle, setToggle] = useState(true);
    const [toggle2, setToggle2] = useState(false);
    const [toggle3, setToggle3] = useState(false);
    const [toggle4, setToggle4] = useState(false);


    /* const [promotedStatus, setpromotedStatus] = useState(false); */


    let promotedProjectLenght = 0;

    // const history = useHistory();
    /* const navigate = useNavigate(); */

    let changeStyle = (btn) => {
        switch (btn) {
            case 1:
                setToggle(true);
                setToggle2(false);
                setToggle3(false);
                setToggle4(false);
                getValidation();
                break;
            case 2:
                setToggle2(true);
                setToggle(false);
                setToggle3(false);
                setToggle4(false);
                getLunch();
                break;
            case 3:
                setToggle3(true);
                setToggle(false);
                setToggle2(false);
                setToggle4(false);
                getTrash();
                break;
            case 4:
                setToggle3(false);
                setToggle(false);
                setToggle2(false);
                setToggle4(true);
                getPromoted();
                break;
            default:
        }
    };


    useEffect(() => {
        fetch('http://localhost:3000/launchDateAdmin/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);
            });
    }, []);


    let getLunch = () => {
        fetch('http://localhost:3000/ecosystem/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);
                getPromotedProjectLenght();
            });
    };

    let getValidation = () => {
        fetch('http://localhost:3000/launchDateAdmin/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);

            });
    };

    let getTrash = () => {
        fetch('http://localhost:3000/trashAdmin/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);

            });
    };

    let deletePost = (postId) => {
        fetch(`http://localhost:3000/trashDef/${postId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((res) => {
                var postIndex = posts.findIndex(function (o) {
                    return o._id === postId;
                });
                if (postIndex !== -1) {
                    setPosts(posts.filter((item) => item.id != postId));
                    getTrash();
                }
            });
    };

    let getPromoted = () => {
        fetch('http://localhost:3000/getPromotedProject/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);
            });
    };

    let getPromotedProjectLenght = () => {
        fetch('http://localhost:3000/getPromotedProjectLenght/')
            .then((res) => res.json())
            .then((res) => {
                editionAdminService.initPromotedProjectLenght();
                editionAdminService.setPromotedProjectLenght(res);
            });
    };


    let validProject = (postId, status, remove) => {
        fetch(`http://localhost:3000/adminEdit/${postId}`, {
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
            console.log('editionAdminService.getPromotedProjectLenght()', editionAdminService.getPromotedProjectLenght());
        }

        if (!promotedStatus) {

            editionAdminService.setPromotedProjectLenght(editionAdminService.getPromotedProjectLenght() + 1);
        }

        console.log('editionAdminService.getPromotedProjectLenght()', editionAdminService.getPromotedProjectLenght());

        if (editionAdminService.getPromotedProjectLenght() <= 8 || promotedStatus || toggle4) {



            fetch(`http://localhost:3000/promotedChange/${postId}`, {
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



    useEffect(() => {
        let postsArray = JSON.parse(JSON.stringify(posts));
        let userData = [];
        postsArray.map((item, index) => {
            item._id = (
                <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>{item._id}</div>
            );
            item.action = (
                <div style={{ display: "flex" }}>

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
                    }} /* onClick={() => history.push(`/editionCoin/${posts[index]._id}`)} */ />}
                 
                    {toggle2 && <AiOutlineClose size={32} style={{
                        cursor: "pointer",
                        color: "red",
                    }} onClick={() => validProject(posts[index]._id, false, false)} />}

                    {toggle2 && <div>{!posts[index].promotedStatus && <AiFillStar size={32}
                        style={{
                            cursor: "pointer",
                            color: "black",
                        }} onClick={() => promotedChangeRequest(posts[index]._id, posts[index].promotedStatus)} />}</div>}



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


                </div>


            );
            item.image = (
                <img style={{ height: "100%", width: "95px", float: "left" }} src={"http://localhost:3000/" + posts[index].image} />
            );
            userData.push(item);
        });
        setUsersForRender(userData);
    }, [posts]);

    const data = {
        columns: [
            {
                label: '#',
                field: 'id',
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

    return (
        <div className="container">
            <Menu className={style.navTabAdmin}>
                <Menu.Item className={toggle ? style.itemTabAdminClick : style.itemTabAdmin} onClick={() => changeStyle(1)}
                    name='À valider'
                />


                <Menu.Item
                    className={toggle2 ? style.itemTabAdminClick : style.itemTabAdmin} onClick={() => changeStyle(2)}

                    name='En ligne'
                />
                <Menu.Item
                    className={toggle3 ? style.itemTabAdminClick : style.itemTabAdmin} onClick={() => changeStyle(3)}

                    name='Corbeille'
                />

                <Menu.Item
                    className={toggle4 ? style.itemTabAdminClick : style.itemTabAdmin} onClick={() => changeStyle(4)}

                    name='Promoted'
                />
            </Menu>


            <MDBDataTableV5
                responsive
                hover
                striped
                bordered
                small
                data={data}
            />
        </div >
    );
}

export default Administration;



