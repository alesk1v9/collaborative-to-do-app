import { useState, useEffect } from 'react'

const Lists = () => {

    const [lists, setLists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLists = async () => {
            
        };

        fetchLists();
    }, []);

  return (
    <div>
        <h1 className="text-2xl font-bold">Your Lists</h1>
        
    </div>
  )
}

export default Lists