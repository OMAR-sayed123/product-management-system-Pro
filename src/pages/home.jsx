import React, { useContext } from 'react';
import Mainsaid from '../components/mainsaid';
import { ProductContext } from '../context/productcontext';
import { CategoriesContext } from '../context/categorycontext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    // useNavigate lets dashboard buttons open the related management pages.
    const navigate = useNavigate();
    const { products } = useContext(ProductContext);
    const { Categories } = useContext(CategoriesContext);

    // Calculate dashboard statistics from the current Context data.
    const totalProducts = products.length;
    const totalCategories = Categories.length;
    const totalStock = products.reduce((sum, p) => sum + parseInt(p.STOCK || 0), 0);
    const inventoryValue = products.reduce((sum, p) => {
        const price = parseFloat(p.PRICE?.replace('$', '') || 0);
        const stock = parseInt(p.STOCK || 0);
        return sum + (price * stock);
    }, 0);

    const stats = [
        { label: 'Total Products', value: totalProducts.toString(), change: '+ 12.3%', trend: 'up' },
        { label: 'Total Categories', value: totalCategories.toString(), change: '+ 8.4%', trend: 'up' },
        { label: 'Total Stock', value: totalStock.toString(), change: '+ 10.2%', trend: 'up' },
        { label: 'Inventory Value', value: `$${inventoryValue.toFixed(2)}`, change: '+ 15.3%', trend: 'up' }
    ];

    const chartDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const chartValues = [20, 12, 18, 16, 25, 32, 22];

    // Get low stock items from products for the warning panel.
    const lowStockItems = products
        .filter(p => p.STATUS === 'Low Stock')
        .slice(0, 4)
        .map((p, i) => ({
            name: p.NAME,
            stock: p.STOCK,
            color: ['purple', 'orange', 'blue', 'dark'][i % 4]
        }));

    // Get recent products
    const recentProducts = products.slice(-3).map(p => ({
        name: p.NAME,
        category: p.CATEGROES,
        stock: p.STOCK,
        price: p.PRICE,
        date: new Date().toLocaleDateString()
    }));

    const chartPoints = chartValues
        .map((value, index) => {
            const x = 40 + index * 70;
            const y = 170 - value * 5;
            return `${x},${y}`;
        })
        .join(' ');

    return (
        <div className="HomePage">
            <Mainsaid />

            <main className="HomeContent">
                <h1 className="HomeTitle">Dashboard</h1>

                <section className="StatsGrid">
                    {stats.map((stat) => (
                        <div className="StatCard" key={stat.label}>
                            <p className="StatLabel">{stat.label}</p>
                            <h2 className="StatValue">{stat.value}</h2>
                            <span className="StatChange positive">{stat.change} from last month</span>
                        </div>
                    ))}
                </section>

                <section className="DashboardGrid">
                    <div className="Panel ChartPanel">
                        <div className="PanelHeader">
                            <h3>Stock Overview</h3>
                            <button className="FilterBtn" type="button">
                                This Week <span>▾</span>
                            </button>
                        </div>

                        <div className="ChartWrap">
                            <svg viewBox="0 0 500 210" preserveAspectRatio="none" aria-label="Stock overview graph">
                                <g className="GridLines">
                                    {[0, 1, 2, 3, 4, 5 ,6].map((line) => (
                                        <line key={line} x1="30" y1={30 + line * 40} x2="480" y2={30 + line * 40} />
                                    ))}
                                </g>
                                <polyline points={chartPoints} />
                                {chartValues.map((value, index) => {
                                    const x = 40 + index * 70;
                                    const y = 170 - value * 5;
                                    return <circle key={`${value}-${index}`} cx={x} cy={y} r="4" />;
                                })}
                            </svg>
                            <div className="ChartLabels">
                                {chartDays.map((day) => (
                                    <span key={day}>{day}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <aside className="Panel LowStockPanel">
                        <div className="PanelHeader">
                            <h3>Low Stock Products</h3>
                            <button className="ViewAllLink" type="button" onClick={() => navigate('/product')}>
                                View All
                            </button>
                        </div>

                        <div className="LowStockList">
                            {lowStockItems.length > 0 ? (
                                lowStockItems.map((item) => (
                                    <div className="LowStockItem" key={item.name}>
                                        <div className={`StockIcon ${item.color}`} aria-hidden="true" />
                                        <div className="StockInfo">
                                            <span>{item.name}</span>
                                        </div>
                                        <span className="StockCount">Stock: {item.stock}</span>
                                    </div>
                                ))
                            ) : (
                                <p style={{color: '#6b7280'}}>No low stock products</p>
                            )}
                        </div>
                    </aside>
                </section>

                <section className="Panel ProductsPanel">
                    <div className="PanelHeader">
                        <h3>Recent Products</h3>
                        <button className="ViewAllLink" type="button" onClick={() => navigate('/product')}>
                            View All
                        </button>
                    </div>

                    <table className="ProductsTable">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Stock</th>
                                <th>Price</th>
                                <th>Added On</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentProducts.length > 0 ? (
                                recentProducts.map((product) => (
                                    <tr key={product.name}>
                                        <td>
                                            <div className="ProductNameCell">
                                                <span className="ProductThumb" aria-hidden="true" />
                                                <span>{product.name}</span>
                                            </div>
                                        </td>
                                        <td>{product.category}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.price}</td>
                                        <td>{product.date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5" style={{textAlign: 'center', color: '#6b7280'}}>No products yet</td></tr>
                            )}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default Home;
