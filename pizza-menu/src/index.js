import React from "react";
import ReacteactDom from "react-dom/client";
import './index.css'
import data from './data.json';

function App() {
    return <div className="container">
        <Header />
        <Menu />
        <Footer />
    </div>
}

function Pizza({ pizzaData }) {

    return (<div className={`pizza ${pizzaData.soldOut? "sold-out" : ""}`}>
        <img src={pizzaData.photoName} alt="Pizza" style={{}} />
        <div>
            <h3>{pizzaData.name}</h3>
            <p>{pizzaData.ingredients}</p>
            <span>{pizzaData.soldOut ? "SOLD OUT" : pizzaData.price}</span>
        </div>
    </div>)
}

function Header() {
    return <>
        <header className="header">
            <h1 style={{}}>
                Fast React Pizza Co.
            </h1>
        </header>
    </>

}
function Menu() {
    return (
        <main className="menu">
            <h2>Our menu</h2>
            <ul className="pizzas">
                {
                    data?.length && data.map((el, i) => <Pizza pizzaData={el} key={i} />)
                }
            </ul>
        </main>
    )
}
function Footer() {
    const hour = new Date().getHours();
    const openHour = 12;
    const closeHour = 22;
    const isOpen = hour >= openHour && hour <= closeHour;

    return (
        <footer className="footer">
            {
                !isOpen ?
                    <Order closeHour={closeHour} />
                    :
                    (
                        <p> We're happy to welcome you between {openHour}:00 and {closeHour}:00.</p>
                    )
            }
        </footer>
    )
}

function Order(props) {
    return (<div className="order">
        <p> We're open until {props.closeHour}:00. Come visit us or order online. </p>
        <button className="btn" onClick={() => {
            alert("LE RE LUND K CHL GYA BUTTON");
        }}>Order</button>
    </div>)
}




const root = ReacteactDom.createRoot(document.getElementById("root"));

root.render(<App />);
