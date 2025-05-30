from typing import TYPE_CHECKING
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, ForeignKey, DateTime, Integer, Float
from .base import db
from datetime import datetime, timezone

if TYPE_CHECKING:
    from .User import User
    from .Companies import Companies
    from .Offers import Offers


class Comments(db.Model):
    __tablename__ = 'comments'
    id: Mapped[int] = mapped_column(primary_key=True)
    content: Mapped[str] = mapped_column(String(520))
    created_at: Mapped[str] = mapped_column(String(100),nullable=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'),nullable=True)
    offer_id: Mapped[int] = mapped_column(ForeignKey('offers.id'),nullable=True)
    company_id: Mapped[int] = mapped_column(ForeignKey('companies.id'),nullable=True)
    rating: Mapped[float] = mapped_column(Float, nullable=True)
    



    #relations
    user = relationship('User',back_populates='comments')
    offert = relationship('Offers',back_populates='comments')
    company = relationship('Companies',back_populates='comments')

    #serialize
    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "user_id": self.user_id,
            "rating": self.rating,
            "user_name": self.user.name if self.user else None,
            "user_avatar": self.user.avatar if self.user and self.user.avatar else None
        }
