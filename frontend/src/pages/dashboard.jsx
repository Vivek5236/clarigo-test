import { useState, useEffect } from "react";
import API from "../services/api";
import Header from "../components/Header";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [editId, setEditId] = useState(null);
    const [file, setFile] = useState(null);
    const [fileKey, setFileKey] = useState(Date.now()); 

    const [form, setForm] = useState({
        name: "",
        lastname: "",
        user_name: "",
        email: "",
        phone: "",
        status: ""
    });

    
    const fetchUsers = async () => {
        const res = await API.get("/users/view");
        setUsers(res.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    
    const handleSubmit = async () => {
        try {
            const formData = new FormData();

            Object.keys(form).forEach((key) => {
                formData.append(key, form[key]);
            });

            if (file) {
                formData.append("image", file);
            }

            if (editId) {
                await API.put(`/users/update/${editId}`, formData);
                setEditId(null);
            } else {
                await API.post("/users/add", formData);
            }

            
            setForm({
                name: "",
                lastname: "",
                user_name: "",
                email: "",
                phone: "",
                status: ""
            });

            setFile(null);
            setFileKey(Date.now()); 

            fetchUsers();

        } catch (error) {
            console.log(error);
        }
    };

    
    const editUser = (user) => {
        const { _id, profile_image, ...rest } = user;
        setForm(rest);
        setEditId(_id);

        setFile(null);
        setFileKey(Date.now()); 
    };

    return (
        <div>
            <Header />

            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">User Management</h2>

                
                <div className="grid grid-cols-2 gap-3 mb-4">

                    <input
                        placeholder="Name"
                        value={form.name}
                        className="border p-2"
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                    />

                    <input
                        placeholder="Last Name"
                        value={form.lastname}
                        className="border p-2"
                        onChange={(e) =>
                            setForm({ ...form, lastname: e.target.value })
                        }
                    />

                    <input
                        placeholder="Username"
                        value={form.user_name}
                        className="border p-2"
                        onChange={(e) =>
                            setForm({ ...form, user_name: e.target.value })
                        }
                    />

                    <input
                        placeholder="Email"
                        value={form.email}
                        className="border p-2"
                        onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                        }
                    />

                    <input
                        placeholder="Phone"
                        value={form.phone}
                        className="border p-2"
                        onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                        }
                    />

                    
                    <input
                        key={fileKey} 
                        type="file"
                        className="border p-2"
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    
                    <select
                        value={form.status}
                        className="border p-2"
                        onChange={(e) =>
                            setForm({ ...form, status: e.target.value })
                        }
                    >
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                
                <button
                    onClick={handleSubmit}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    {editId ? "Update User" : "Add User"}
                </button>

                
                <table className="w-full mt-6 border">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>Profile</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Edit</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u) => (
                            <tr key={u._id} className="text-center border-t">

                                
                                <td>
                                    {u.profile_image ? (
                                        <img
                                            src={`http://localhost:8080/api/v6/user/profile/${u.profile_image}`}
                                            alt="profile"
                                            width="50"
                                        />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </td>

                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.phone}</td>
                                <td>{u.status}</td>

                                <td>
                                    <button
                                        onClick={() => editUser(u)}
                                        className="bg-yellow-500 px-2 py-1 rounded text-white"
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;