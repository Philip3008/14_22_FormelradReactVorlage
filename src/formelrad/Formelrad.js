import {useState} from "react";
import '../css/mvp.css';
import formelrad from "../image/formelradelektronik.gif";
import InputField from "../formular/InputField";

export default function Formelrad() {
    const [values, setValues] = useState({
        u: 10,
        i: 2,
        r: "",
        p: "",
        colorU: "black",
        colorI: "black",
        colorR: "black",
        colorP: "black"
    })

    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("black");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("handleSubmit");

        if (values.u === "" && values.i === "") {
            setValues(values => ({
                ...values,
                u: Math.sqrt(values.p * values.r),
                i: Math.sqrt(values.p / values.r),
                colorU: "red",
                colorI: "red"
            }));
        } else if (values.u === "" && values.r === "") {
            setValues(values => ({
                ...values,
                u: values.p / values.i,
                r: values.p / values.i / values.i,
                colorU: "red",
                colorR: "red"
            }));
        } else if (values.u === "" && values.p === "") {
            setValues(values => ({
                ...values,
                u: values.i * values.r,
                p: values.i * values.i * values.r,
                colorU: "red",
                colorP: "red"
            }));
        } else if (values.i === "" && values.r === "") {
            setValues(values => ({
                ...values,
                i: values.p / values.u,
                r: values.u * values.u / values.p,
                colorI: "red",
                colorR: "red"
            }));
        } else if (values.i === "" && values.p === "") {
            setValues(values => ({
                ...values,
                i: values.u / values.r,
                p: values.u * values.u / values.r,
                colorI: "red",
                colorP: "red"
            }));
        } else {
            setValues(values => ({
                ...values,
                r: values.u / values.i,
                p: values.u * values.i,
                colorR: "red",
                colorP: "red"
            }));
        }
        setMessage("Calculation done. Please verify results.");
        setMessageColor("red");
    }

    const clear = () => {
        setValues({
            u: "",
            i: "",
            r: "",
            p: "",
            colorU: "black",
            colorI: "black",
            colorR: "black",
            colorP: "black"
        });
        setMessage("");
        setMessageColor("black");
    }

    return (
        <>
            <section>
                <header>
                    <h2>Formelrad</h2>
                    <img src={formelrad} width="200" alt="Formelrad"/>
                </header>
                <form onSubmit={handleSubmit}>
                    <InputField color={values.colorU} value={values.u} label="Spannung" handleChange={e => {setValues(values => ({...values, u: e.target.value, colorU: "black"}))}} />
                    <InputField color={values.colorI} value={values.i} label="Stromstärke" handleChange={e => {setValues(values => ({...values, i: e.target.value, colorI: "black"}))}} />
                    <InputField color={values.colorR} value={values.r} label="Widerstand" handleChange={e => {setValues(values => ({...values, r: e.target.value, colorR: "black"}))}} />
                    <InputField color={values.colorP} value={values.p} label="Leistung" handleChange={e => {setValues(values => ({...values, p: e.target.value, colorP: "black"}))}} />
                    <button type="submit">Calculate</button>
                    <button type="button" onClick={clear}>Clear</button>
                    <p style={{color: messageColor}}>{message}</p>
                </form>
            </section>
        </>
    )
}
