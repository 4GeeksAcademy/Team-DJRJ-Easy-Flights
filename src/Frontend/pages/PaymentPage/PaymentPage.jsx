import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);
  const [form, setForm] = useState({
    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    paymentMethod: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/offers/${id}`)
      .then((res) => res.json())
      .then((data) => setOffer(data.offer))
      .catch((err) => console.error("Error fetching offer:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      // Eliminar cualquier carácter no numérico
      let formattedValue = value.replace(/\D/g, "");

      // Dividir el número de tarjeta en bloques de 4 dígitos
      formattedValue = formattedValue.replace(/(.{4})(?=.)/g, "$1 ");

      setForm((prev) => ({ ...prev, [name]: formattedValue }));
    } else if (name === "expirationDate") {
      let formatted = value.replace(/\D/g, "");
      if (formatted.length >= 3) {
        formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`;
      }
      setForm((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRadioChange = (e) => {
    setForm((prev) => ({ ...prev, paymentMethod: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = {};
    if (!form.cardholderName) formErrors.cardholderName = "El nombre del titular es obligatorio.";
    if (!form.cardNumber) formErrors.cardNumber = "El número de tarjeta es obligatorio.";
    if (!form.expirationDate) formErrors.expirationDate = "La fecha de expiración es obligatoria.";
    if (!form.cvv || form.cvv.length !== 3) formErrors.cvv = "El CVV debe tener 3 dígitos.";
    if (!form.paymentMethod) formErrors.paymentMethod = "Selecciona un método de pago.";

    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      const paymentId = Math.random().toString(36).substring(2, 9);
      navigate(`/bill/${id}/${paymentId}`, { state: { offer, payment: form } });
    }
  };

  if (!offer) return <p>Cargando datos de la oferta...</p>;

  return (
    <div className="payment-container">
      <h2>Formulario de Pago</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        <label> Seleccionar metodo de pago</label>
        {/* Selección de método de pago */}
        <div className="payment-methods">
          <div className="payment-method">
            <input
              type="radio"
              id="visa"
              name="paymentMethod"
              value="Visa"
              checked={form.paymentMethod === "Visa"}
              onChange={handleRadioChange}
            />
            <label htmlFor="visa">
              <i className="fab fa-cc-visa"></i> 
            </label>
          </div>

          <div className="payment-method">
            <input
              type="radio"
              id="mastercard"
              name="paymentMethod"
              value="Mastercard"
              checked={form.paymentMethod === "Mastercard"}
              onChange={handleRadioChange}
            />
            <label htmlFor="mastercard">
              <i className="fab fa-cc-mastercard"></i>
            </label>
          </div>

          <div className="payment-method">
            <input
              type="radio"
              id="applePay"
              name="paymentMethod"
              value="Apple Pay"
              checked={form.paymentMethod === "Apple Pay"}
              onChange={handleRadioChange}
            />
            <label htmlFor="applePay">
              <i className="fab fa-apple"></i> 
            </label>
          </div>

          <div className="payment-method">
            <input
              type="radio"
              id="googlePay"
              name="paymentMethod"
              value="Google Pay"
              checked={form.paymentMethod === "Google Pay"}
              onChange={handleRadioChange}
            />
            <label htmlFor="googlePay">
              <i className="fab fa-google-pay"></i> 
            </label>
          </div>
        </div>
        {errors.paymentMethod && <span className="error-text">{errors.paymentMethod}</span>}


        <div className="form-group">
          <label>Nombre del titular</label>
          <input
            name="cardholderName"
            value={form.cardholderName}
            onChange={handleChange}
            placeholder="Nombre completo"
            className="form-control"
          />
          {errors.cardholderName && <span className="error-text">{errors.cardholderName}</span>}
        </div>

        <div className="form-group">
          <label>Número de tarjeta</label>
          <input
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            maxLength="19" // 16 dígitos + 3 espacios
            placeholder="1234 5678 9012 3456"
            className="form-control"
          />
          {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
        </div>

        <div className="form-group">
          <label>Fecha de expiración</label>
          <input
            name="expirationDate"
            value={form.expirationDate}
            onChange={handleChange}
            placeholder="MM/YY"
            maxLength="5"
            className="form-control"
          />
          {errors.expirationDate && <span className="error-text">{errors.expirationDate}</span>}
        </div>

        <div className="form-group">
          <label>CVV</label>
          <input
            name="cvv"
            type="password"
            value={form.cvv}
            onChange={handleChange}
            placeholder="CVV"
            maxLength="3"
            className="form-control"
          />
          {errors.cvv && <span className="error-text">{errors.cvv}</span>}
        </div>

        <button type="submit" className="btn processingpayment w-100">Procesar pago</button>
        <Link to={`/offerdetails/${id}`} className="btn w-100 mt-2 cancelbutton">Cancelar</Link>
      </form>
    </div>
  );
};

export default PaymentPage;