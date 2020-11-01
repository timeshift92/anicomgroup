import React from 'react';
import './App.css';
import { Header } from './components/header/Header';
import { Product } from './features/product/Product';

function App() {

    return (
        <div className="App">
            <header>
                <Header />
            </header>
            <main>
                <Product />
            </main>
            <footer></footer>
        </div>
    );
}

export default App;
