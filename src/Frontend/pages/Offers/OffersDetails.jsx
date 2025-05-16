import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar } from "lucide-react";
import "./OffersDetails.css"
import Comments from "../../components/Comments/Comments";
import { useAuth } from "../../hooks/useAuthContext";
import useGlobalReducer from "../../hooks/useGlobalReducer";

/*import { Modal } from 'bootstrap';*/

const url = import.meta.env.VITE_BACKEND_URL



export const OffersDetails = () => {

  const { store, dispatch } = useGlobalReducer();
  const comments = store.comments;
  const { id } = useParams();
  const [offer, setOffer] = useState({})
  const [newComment, setNewComment] = useState("");
  const [selectedRating, setsSelectedRating] = useState("");
  //const [comments, setComments] = useState([]);

  const { user } = useAuth();
  const isCompany = user && Array.isArray(user.roles) && user.roles.includes("COMPANY");

  //console.log("Stored user:", JSON.parse(localStorage.getItem("user")));

  const getComments = () => {
    fetch(`${url}/api/offers/${id}/comments`)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "SET_COMMENTS", payload: data });
      })
      .catch(err => console.error("Error fetching comments", err));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    const payload = {
      offer_id: parseInt(id), // backend check
      content: newComment,
      rating: selectedRating,
      user_id: storedUser?.id,
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
        document.getElementById("exampleModal").classList.remove("show");
        document.body.classList.remove("modal-open");
        setsSelectedRating("");
        getComments();

        const modalEl = document.getElementById("exampleModal");
        if (modalEl && window.bootstrap) {
          const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
          modalInstance?.hide();
        }
      })
      .catch((err) => {
        console.error("Error posting comment:", err);
      });
  };

  const handleRatingChange = (e) => {
    const rating = e.target.value;
    setsSelectedRating(rating);
    console.log("Selected rating:", rating);
  };


  useEffect(() => {
    getComments();
  }, [id]);


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
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  const averageRating = comments.length
    ? (comments.reduce((sum, comment) => sum + comment.rating, 0) / comments.length).toFixed(1)
    : null;


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

                    <a href={`/offerdetails/${id}/pago`} className="book-btn">Book Now</a>

                    <div className="rating-media">
                      <p className="text-lg mb-4">
                        Valoración ⭐️ : <strong>{averageRating} / 5</strong>
                      </p>

                    </div>

                    {/*button trigger modal*/}
                    <button
                      type="button"
                      className={`btn-add-comment ${isCompany ? "d-none" : ""}`}
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
                      <div className="modal-dialog" role="document" >
                        <div className="modal-content card-modal">
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
                                <label
                                  htmlFor="rating"
                                  className="form-label mt-3"
                                >
                                  Seleccione su puntuación:
                                </label>

                                <div className="rating text-center">
                                  <input
                                    defaultValue={5}
                                    name="rating"
                                    id="star5"
                                    type="radio"
                                    onChange={handleRatingChange}
                                  />
                                  <label htmlFor="star5" />
                                  <input
                                    defaultValue={4}
                                    name="rating"
                                    id="star4"
                                    type="radio"
                                    onChange={handleRatingChange}
                                  />
                                  <label htmlFor="star4" />
                                  <input
                                    defaultValue={3}
                                    name="rating"
                                    id="star3"
                                    type="radio"
                                    onChange={handleRatingChange}
                                  />
                                  <label htmlFor="star3" />
                                  <input
                                    defaultValue={2}
                                    name="rating"
                                    id="star2"
                                    type="radio"
                                    onChange={handleRatingChange}
                                  />
                                  <label htmlFor="star2" />
                                  <input
                                    defaultValue={1}
                                    name="rating"
                                    id="star1"
                                    type="radio"
                                    onChange={handleRatingChange}
                                  />
                                  <label htmlFor="star1" />
                                </div>

                              </div>
                              <div className="d-flex justify-content-end">
                                <button type="submit" className="button-submit">
                                  Submit Comment
                                </button>
                              </div>
                            </form>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="button-close"
                              data-bs-dismiss="modal"
                            >
                              Close
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