import { useState, useEffect } from "react";
import API from "../services/api";
import Header from "../components/Header";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        name: "",
        lastname: "",
        user_name: "",
        email: "",
        phone: "",
        profile_image: "",
        status: ""
    });

    // 🔥 Fetch Users
    const fetchUsers = async () => {
        const res = await API.get("/users/view");
        setUsers(res.data); // agar backend data wrapper deta hai toh yaha change karna
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async () => {
        if (editId) {
            await API.put(`/users/update/${editId}`, form);
            setEditId(null);
        } else {
            await API.post("/users/add", form);
        }

        setForm({
            name: "",
            lastname: "",
            user_name: "",
            email: "",
            phone: "",
            profile_image: "",
            status: ""
        });

        fetchUsers();
    };

    const editUser = (user) => {
        const { _id, ...rest } = user;
        setForm(rest);
        setEditId(_id);
    };

    return (
        <div>
            <Header />

            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">User Management</h2>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    {Object.keys(form).map((key) =>
                        key !== "status" ? (
                            <input
                                key={key}
                                placeholder={key}
                                value={form[key]}
                                className="border p-2"
                                onChange={(e) =>
                                    setForm({ ...form, [key]: e.target.value })
                                }
                            />
                        ) : (
                            <select
                                key={key}
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
                        )
                    )}
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
