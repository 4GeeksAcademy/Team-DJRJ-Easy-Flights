import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, MapPin, Star, StarsIcon } from "lucide-react";
import "./OffersDetails.css"
import Comments from "../../components/Comments/Comments";

/*import { Modal } from 'bootstrap';*/

const url = import.meta.env.VITE_BACKEND_URL



export const OffersDetails = () => {

  const { id } = useParams();
  const [offer, setOffer] = useState({})
  const [newComment, setNewComment] = useState("");
  const [selectedRating, setsSelectedRating] =useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const payload = {
      offer_id: parseInt(id), // backend check
      content: newComment,
      rating: selectedRating,
    };

    console.log("Sending comment payload:", JSON.stringify(payload, null, 2));

    fetch(`${url}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to post comment");
        return res.json();
      })
      .then((data) => {
        console.log("Comment posted:", data);
        setNewComment("");
        document.getElementById("exampleModal").classList.remove("show"); // optional: close modal manually
        document.body.classList.remove("modal-open");                     // cleanup
        document.querySelector(".modal-backdrop")?.remove();             // remove backdrop
      })
      .catch((err) => {
        console.error("Error posting comment:", err);
      });
  };


  useEffect(() => {

    fetch(`${url}/api/offers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((resp) => resp.json())
      .then(data => { setOffer(data.offer) })
      .catch(error => {
        console.error("Ha salido un error", error)

      })
  }
    , [id])

  /*useEffect(() => {
    const modalEl = document.getElementById("exampleModal");
    if (window.bootstrap && modalEl) {
      window.bootstrap.Modal.getOrCreateInstance(modalEl);
    }
  }, []);*/
  useEffect(() => {
    const timeout = setTimeout(() => {
      const modalEl = document.getElementById("exampleModal");
      if (modalEl && window.bootstrap) {
        window.bootstrap.Modal.getOrCreateInstance(modalEl);
      }
    }, 0); // you can also try 100 if needed

    return () => clearTimeout(timeout);
  }, []);


  return (
    <div className="container-fluid">
      <div>
        {offer ? (
          <div>
            <div className="text-center my-3">
              <h1>{offer.title}</h1>
            </div>

            <section
              className="object-cover w-100 h-100 imgsection"
              id="img-offer"
            >
              <img src={offer.imagedetails1} alt="1" />
              <img src={offer.imagedetails2} alt="1" />
              <img src={offer.imagedetails3} alt="1" />
              <img src={offer.imagedetails4} alt="1" />
            </section>

            <section className="details">
              <div className="info">
                <div className="">
                  <h2>Fecha de la oferta</h2>
                  <p className="mx-4">
                    {offer.start_date} - {offer.end_date}
                  </p>
                  <h2>Información</h2>
                  <p className="mx-4">{offer.description}</p>

                  <h3>¿Qué incluye?</h3>
                  <ul className="included">
                    <li>
                      <span className="text-success me-1">✔</span> Alojamiento
                    </li>
                    <li>
                      <span className="text-success me-1">✔</span> Transporte{" "}
                    </li>
                    <li>
                      <span className="text-success me-1">✔</span> Comida
                    </li>
                    <li>
                      <span className="text-success me-1">✔</span> Actividades
                      diarias
                    </li>
                  </ul>

                  <h3>Tags</h3>
                  <div className="tags">
                    <span>{offer.tags}</span>
                    <span>Viaje</span>
                    <span>Cultura</span>
                  </div>
                  <Comments offer_id={id} />
                </div>

                <div>
                  <div className="sidebar">
                    <h2>{offer.price}&nbsp;€</h2>
                    <p>Por persona</p>
                    <div className="details-box">
                      <p>
                        <Calendar />
                        {offer.duration}
                      </p>
                    </div>
                    <a href="#" className="book-btn">
                      Book Now
                    </a>
                    <div className="rating text-center">
                      <input
                        defaultValue={5}
                        name="rating"
                        id="star5"
                        type="radio"
                      />
                      <label htmlFor="star5" />
                      <input
                        defaultValue={4}
                        name="rating"
                        id="star4"
                        type="radio"
                      />
                      <label htmlFor="star4" />
                      <input
                        defaultValue={3}
                        name="rating"
                        id="star3"
                        type="radio"
                      />
                      <label htmlFor="star3" />
                      <input
                        defaultValue={2}
                        name="rating"
                        id="star2"
                        type="radio"
                      />
                      <label htmlFor="star2" />
                      <input
                        defaultValue={1}
                        name="rating"
                        id="star1"
                        type="radio"
                      />
                      <label htmlFor="star1" />
                    </div>
                    {/*button trigger modal*/}
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        const modalEl = document.getElementById("exampleModal");
                        if (modalEl && window.bootstrap) {
                          const modal = new window.bootstrap.Modal(modalEl);
                          modal.show();
                        }
                      }}
                    >
                      Añadir nueva reseña
                    </button>

                    {/*modal*/}
                    <div
                      className="modal"
                      id="exampleModal"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Nueva Reseña
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            {/*modal body empieza aqui*/}
                            <form
                              id="commentForm"
                              onSubmit={handleCommentSubmit}
                            >
                              <div className="mb-3">
                                <label
                                  htmlFor="commentText"
                                  className="form-label"
                                >
                                  Escriba su reseña aquí!
                                </label>
                                <textarea
                                  className="form-control"
                                  id="commentText"
                                  rows="3"
                                  value={newComment}
                                  onChange={(e) =>
                                    setNewComment(e.target.value)
                                  }
                                  required
                                ></textarea>
                              </div>
                              <button type="submit" className="btn btn-primary">
                                Submit Comment
                              </button>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button type="button" className="btn btn-primary">
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*modal end*/}
                    {/*<Comments />*/}
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <p>Cargando detalles de la oferta...</p>
        )}
      </div>
    </div>
  );
}