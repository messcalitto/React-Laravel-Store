import './home.css';

export default function Home() {
  return (
    <div className='homeWrapper'>
        <div className="homeInfoBox">
            <span className="title">
                Users
            </span>
            Tital: 234<br/>
            This Week: 10
        </div>

        <div className="homeInfoBox">
            <span className="title">
                Products
            </span>
            Tital: 180<br/>
            This Week: 35
        </div>

        <div className="homeInfoBox">
            <span className="title">
                Sales
            </span>
            Tital: 350<br/>
            This Week: 150
        </div>
    </div>
  )
}
