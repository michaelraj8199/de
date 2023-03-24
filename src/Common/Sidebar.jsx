import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()

  return (
    <div className="sidebarwrapper">
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3></h3>
                </div>

                <ul className="list-unstyled components">
                    {/* <p>DE</p> */}

                    <li onClick={() => navigate("/deconfig")} >
                        <a href="#">DE Config </a>
                    </li>
                    {/* <li onClick={() => navigate("/deconfig")}>
                        <a href="#">Rule Databases</a>
                    </li> */}
                    <li onClick={() => navigate("/pricingmodelmapping")}>
                        <a href="#">Pricing Model Mapping </a>
                    </li>
                    <li onClick={() => navigate("/offermapping")}>
                        <a href="#">Offer Mapping</a>
                    </li>
                    <li onClick={() => navigate("/termmapping")}>
                        <a href="#">Terms Mapping</a>
                    </li>
                    {/* <li onClick={() => navigate("/runinsanbox")}>
                        <a href="#">Run In Sandbox</a>
                    </li> */}
                    <li onClick={() => navigate("/grade")}>
                        <a href="#">Grade</a>
                    </li>
                    <li onClick={() => navigate("/pricingmodel")}>
                        <a href="#">Princing Model</a>
                    </li>
                    <li onClick={() => navigate("/offerproduct")}>
                        <a href="#">Offerd Product</a>
                    </li>
                    <li onClick={() => navigate("/productvalue")}>
                        <a href="#">Product Value </a>
                    </li >
                    <li onClick={() => navigate("/term")}>
                        <a href="#">Term</a>
                    </li>
                </ul>

            </nav>

        </div>
  )
}

export default Sidebar