import { useState, useEffect } from 'react';
import axios from 'axios';

import "./Profile.css"

const Profile = () => {
    const [projects, setProjects] = useState([]);
    const [updateProject, setUpdateProject] = useState(null);
    const [title, setTitle] = useState(updateProject ? updateProject.title : '');
    const [progress, setProgress] = useState(updateProject ? updateProject.progress : '');
    

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await axios.get('/api/projects', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            setProjects(response.data);
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        if (updateProject) {
            setTitle(updateProject.title);
            setProgress(updateProject.progress);
        } else {
            setTitle('');
            setProgress('');
        }
    }, [updateProject]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log('No token')
                return;
            }
            if (updateProject) {
                const response = await axios.put(`/api/projects/${updateProject._id}`, { title, progress }, { headers: { Authorization: `Bearer ${token}`} });
                setProjects(projects.map((project) => project._id === updateProject._id ? response.data : project));
            } else {
                const response = await axios.post('/api/projects', { title, progress }, { headers: { Authorization: `Bearer ${token}`} });
                setProjects([...projects, response.data]);
            }
            setTitle('');
            setProgress('');
            setUpdateProject(null);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete= async (id) => {
        try {
            await axios.delete(`/api/projects/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            setProjects(projects.filter((project) => project._id !== id));
            setUpdateProject(null);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='profile-container'>
            <h1 className='profile-heading'>Welcome to your Profile Page!</h1>
            <h2 className='profile-subheading'>Enter a new project</h2>
            <form className='profile-form' onSubmit={handleSubmit}>
                <label className='profile-label'>
                    Title:
                    <textarea className='profile-label-input-textarea' type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <label>
                    Progress:
                    <textarea className='profile-label-input-textarea' value={progress} onChange={(e) => setProgress(e.target.value)} required />
                </label>
                <button className='profile-button' type="submit">{updateProject ? 'Update' : 'Create'}</button>
            </form>
            <h2 className='profile-subheading'>Your previous Projects</h2>
            <ul className='profile-ul'>
                {projects.map((project) => (
                    <li className='profile-li' key={project._id}>
                        <h3>{project.title}</h3>
                        <p>{project.progress}</p>
                        <button className='prev-project-delete-button' onClick={() => handleDelete(project._id)}>Delete</button>
                        <button className='prev-project-edit-button' onClick={() => setUpdateProject(project)}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;