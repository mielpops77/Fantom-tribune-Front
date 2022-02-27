import { MDBDataTableV5 } from 'mdbreact';
import { useEffect, useState } from "react";
import { AiFillEdit } from 'react-icons/ai';
import { AiOutlineCheck } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';

function TableauAdmin() {
    const [posts, setPosts] = useState([]);
    const [usersForRender, setUsersForRender] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/launchDateAdmin/')
            .then((res) => res.json())
            .then((res) => {

                setPosts(res);
            });
    }, []);


    let getLunch = () => {
        fetch('http://localhost:3000/api/v1/launchDateAdmin/')
            .then((res) => res.json())
            .then((res) => {
                setPosts(res);

            });
    };

    let deletePost = (postId) => {
        fetch(`http://localhost:3000/api/v1/blog-posts/${postId}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((res) => {
                var postIndex = posts.findIndex(function (o) {
                    return o._id === postId;
                });
                if (postIndex !== -1) {
                    console.log('??????????')
                    setPosts(posts.filter((item) => item.id != postId));
                    getLunch();
                }
            });
    };


    let validProject = (postId) => {
        fetch(`http://localhost:3000/api/v1/adminEdit/${postId}`, {
            method: "Put",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: true })
        })
            .then((res) => res.json())
            .then((res) => {

                getLunch();
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

                    <AiOutlineCheck size={32} style={{
                        cursor: "pointer",
                        color: "green",
                    }} onClick={() => validProject(posts[index]._id)} />

                    <AiOutlineClose size={32} style={{
                        cursor: "pointer",
                        color: "red",
                    }} onClick={() => deletePost(posts[index]._id)} />
                    <AiFillEdit size={32} style={{
                        cursor: "pointer",
                        color: "blue",
                    }} onClick={() => deletePost(posts[index]._id)} />
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
            <MDBDataTableV5
                responsive
                hover
                striped
                bordered
                small
                data={data}
            />
        </div>
    );
}

export default TableauAdmin;



