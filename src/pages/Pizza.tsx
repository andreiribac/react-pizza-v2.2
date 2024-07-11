import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface PizzaData {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
}

function Pizza() {
  const [pizza, setPizza] = useState<PizzaData | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get<PizzaData>(`https://62cd50e9066bd2b6992348cd.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Error pizza page');
        navigate('/');
      }
    }
    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return (
      <div className="container">
        Загрузка
      </div>
    );
  }

  return (
    <div className="container">
      {/* <div>{id}</div> */}
      <h2>{pizza.title}</h2>
      {/* <h4>{pizza.category}</h4> */}
      <img src={pizza.imageUrl} alt={pizza.title} />
      {/* <div>{pizza.types}</div> */}
      {/* <div>{pizza.sizes}</div> */}
      {
        pizza.price &&
        <div>{pizza.price} p</div>
      }
    </div>
  );
}

export default Pizza;