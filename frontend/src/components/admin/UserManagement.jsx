import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, fetchUsers ,updateUser } from "../../redux/slices/adminSlice";
import { useNavigate } from "react-router-dom";



const UserManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const {user} = useSelector((state) => state.auth);
    const {users , loading ,error} = useSelector((state) => state.admin);


    useEffect(() => {
          if (user && user.role !== "admin"){
            
            navigate("/");
          }
    },[user, navigate]);
 
    useEffect(() =>{
        if (user && user.role === "admin"){
            dispatch(fetchUsers());
        }
    },[dispatch ,user]);

    const [formData ,setFormData] = useState ({
        
        name:"",
        email:"",
        password:"",
        role:"customer", //default role
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,[e.target.name] : e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addUser(formData));
        
        // Reset the form after submission the form 
        setFormData({
            
            name:"",
            email:"",
            password:"",
            role:"customer",
        });
    };

    const handleRoleChange  = (userId , newRole) => {
        dispatch(updateUser({id:userId , role: newRole}));
        
    };

    const handleDeleteUser = (userId) => {
        if(window.confirm("Are you sure you want to delete this user?")){
            dispatch(deleteUser(userId));
            
        }
    };


  return (
    <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">User Management</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error:{error}</p>}
        {/* Add new user form */}
        <div className="p-6 rounded-lg mb-6">
          <h2 className="text-lg font-bold mb-4">Add New User</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 
                focus:ring-blue-500 hover:border-gray-200"  required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 
                focus:ring-blue-500 hover:border-gray-200"  required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange}
                className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 
                focus:ring-blue-500 hover:border-gray-200"  required />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <select name="role" value={formData.role} onChange={handleChange}
                className="w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-2 
                focus:ring-blue-500 hover:border-gray-200">
                    <option value="customer" className="bg-blue-500">Customer</option>
                    <option value="admin" className="bg-blue-500">Admin</option>
                </select>
            </div>
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                Add User
            </button>
          </form>
        </div>
        {/* User list Management */}
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full text-left text-gray-500">
                <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                    <tr>
                        <td className="py-3 px-4">Name</td>
                        <td className="py-3 px-4">Email</td>
                        <td className="py-3 px-4">Role</td>
                        <td className="py-3 px-4">Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key = {user._id} className="border-b hover:bg-gray-50">
                            <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                                {user.name}
                            </td>
                            <td className="p-4">{user.email}</td>
                            <td className="p-4">
                                <select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                className="p-2 border rounded">
                                <option className="bg-blue-500 text-white" value="customer">Customer</option>
                                <option className="bg-blue-500 text-white" value="admin">Admin</option>
                                </select>
                            </td>
                            <td className="p-4">
                                <button onClick={() => handleDeleteUser(user._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                    Delete
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

export default UserManagement;