import React, { useState } from "react";

export const Pagination = () => {
    const [info, setInfo] = useState({
        fname: "",
        email: "",
        psw: "",
        add: "",
        state: [],
        id: ""
    });
    const [create, setCreate] = useState((JSON.parse(localStorage.getItem("create"))) || []);


    function checkchange(e) {
        if (e.target.checked) {
            setInfo({ ...info, state: [...info.state, e.target.value] })
        }
        else {
            setInfo({ ...info, state: [...info.state.filter(value => value !== e.target.state)] })
        }
        console.log(e.target.checked, e.target.value)
    }


    function handlechane(e) {
        console.log(e.target)
        let { name, value } = e.target;
        setInfo({ ...info, [name]: value, id: Date.now() })
    }
    function handlesubmit(e) {
        console.log(e.target)
        setCreate([...create, info])
        localStorage.setItem("create", JSON.stringify([...create, info]));
    }


    const Handledelete = (inx) => {
        console.log(inx.target);
        const deletedata = create.filter((item, index) => index !== inx);
        setCreate(deletedata);
        localStorage.setItem("create", JSON.stringify(deletedata));
    }

    const [currentpage, setCurrentpage] = useState(1);
    const recordPage = 5;
    const npage = Math.ceil(create?.length / recordPage);
    function prepage() {
        if (currentpage !== 1) {
            setCurrentpage(currentpage - 1)
        }
    }
    function ChangeCPage(id) {
        console.log(id)
        setCurrentpage(id)
    }
    function nextPage() {
        if (currentpage !== npage) {
            setCurrentpage(currentpage + 1)
        }
    }
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(create.length / recordPage); i++) {
        pageNumbers.push(i);
    }
    console.log("pageNumbers", pageNumbers, create?.slice(recordPage * currentpage - recordPage, currentpage * recordPage))

    return (
        <>


            <div style={{ backgroundColor: "#eee", padding: "3%", borderRadius: "15px", marginTop: "3%", marginLeft: "12%", marginRight: "2%" }}>
                
                <div style={{ marginTop: "20px" }}>
                    <label htmlFor="fname">Full Name:</label>
                    <input type="text" id="fname" name="fname" value={info.fname} onChange={handlechane} /><br /><br />
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={info.email} onChange={handlechane} /><br /><br />
                    <label htmlFor="psw">Password:</label>
                    <input type="password" id="psw" name="psw" value={info.psw} onChange={handlechane} /><br /><br />
                    <label htmlFor="add">Address:</label>
                    <input type="text" id="add" name="add" value={info.add} onChange={handlechane} /><br /><br />
                    <label htmlFor="state">State: </label>
                    <input type="checkbox" id="state" name="state" value="Gujarat" onChange={checkchange} />Gujarat,
                    <input type="checkbox" id="state" name="state" value="Rajasthan" onChange={checkchange} />Rajasthan,
                    <input type="checkbox" id="state" name="state" value="Haryana" onChange={checkchange} />Haryana<br /><br />
                    <button type="button" onClick={handlesubmit}>SUBMIT</button><br /><br />

                </div>

                <table className="table table-striped">
                    <thead>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Address</th>
                        <th>State</th>
                        <th>Del. Btn</th>

                    </thead>
                    <tbody>
                        {create?.slice(recordPage * currentpage - recordPage, currentpage * recordPage).map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.fname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.psw}</td>
                                    <td>{item.add}</td>
                                    <td><ol>{item?.state?.map((index) => {
                                        return (
                                            <li>{index}</li>
                                        )
                                    })}</ol></td>
                                    <td><button type="button" onClick={() => Handledelete(index)}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <button size="5" onClick={(e) => prepage(e)} >Previous</button>
                {pageNumbers.map((item) => <button onClick={(e) => ChangeCPage(parseInt(e.target.innerText))}>{item}</button>)}
                <button size="5" onClick={(e) => nextPage(e)} >Next</button>
            </div>
        </>
    )
}