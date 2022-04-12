import { MDBDataTableV5 } from 'mdbreact';
import { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineClose, AiFillEdit } from 'react-icons/ai';
import { FaTrashRestore } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { Menu } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom';

function Administration() {

    const [posts, setPosts] = useState([]);
    const [usersForRender, setUsersForRender] = useState([]);
    const [toggle, setToggle] = useState(true);
    const [toggle2, setToggle2] = useState(false);
    const [toggle3, setToggle3] = useState(false);


    const history = useHistory();

    let changeStyle = (btn) => {

        console.log(btn)
        switch (btn) {
            case 1:
                setToggle(true);
                setToggle2(false);
                setToggle3(false);
                getValidation();
                break;
            case 2:
                setToggle2(true);
                setToggle(false);
                setToggle3(false);
                getLunch();
                break;
            case 3:
                setToggle3(true);
                setToggle(false);
                setToggle2(false);
                getTrash();
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
                    }} onClick={() => history.push(`/editionCoin/${posts[index]._id}`)} />}

                    {toggle2 && <AiOutlineClose size={32} style={{
                        cursor: "pointer",
                        color: "red",
                    }} onClick={() => validProject(posts[index]._id, false, false)} />}


                    {toggle3 && <FaTrashRestore size={32} style={{
                        cursor: "pointer",
                        color: "green",
                    }} onClick={() => validProject(posts[index]._id, false, false)} />}

                    {toggle3 && < BsTrash size={32} style={{
                        cursor: "pointer",
                        color: "red",
                    }} onClick={() => deletePost(posts[index]._id)} />}

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

            <Menu className="navTabAdmin">

                <Menu.Item className={toggle ? "itemTabAdminClick" : "itemTabAdmin"} onClick={() => changeStyle(1)}
                    name='À valider'
                />


                <Menu.Item
                    className={toggle2 ? "itemTabAdminClick" : "itemTabAdmin"} onClick={() => changeStyle(2)}

                    name='En ligne'
                />
                <Menu.Item
                    className={toggle3 ? "itemTabAdminClick" : "itemTabAdmin"} onClick={() => changeStyle(3)}

                    name='Corbeille'
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



