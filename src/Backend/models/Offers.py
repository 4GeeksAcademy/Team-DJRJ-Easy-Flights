from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Boolean, ForeignKey,DateTime, Float, Text
from datetime import datetime, timezone
from typing import TYPE_CHECKING
from .base import db

if TYPE_CHECKING:
    from .Companies import Companies
    from .Comments import Comments
    from .Payments import Payments

class Offers(db.Model):
    __tablename__ = 'offers'
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False) 
    description: Mapped[str] = mapped_column(Text, nullable=True)
    price:Mapped[float] = mapped_column(Float, nullable=False)
    type_offert:Mapped[str] = mapped_column(String(120),nullable=True)
    image_url: Mapped[str] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=True)
    start_date: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=True)
    end_date: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc), nullable=True)
    company_id: Mapped[int] = mapped_column(ForeignKey('companies.id'), nullable=True)
    duration: Mapped[str] = mapped_column(String(120),nullable=True)
    location: Mapped[str] = mapped_column(String(120),nullable=True)
    tags: Mapped[str] = mapped_column(String(120),nullable=True)
    imagedetails1: Mapped[str] = mapped_column(Text, nullable=True)
    imagedetails2: Mapped[str] = mapped_column(Text, nullable=True)
    imagedetails3: Mapped[str] = mapped_column(Text, nullable=True)
    imagedetails4: Mapped[str] = mapped_column(Text, nullable=True)
    rating: Mapped[float] = mapped_column(Float, nullable=True)
    #relations
    comments = relationship('Comments',back_populates='offert')
    company = relationship('Companies',back_populates='offert')
    payments = relationship('Payments',back_populates='offer')

    #serialize
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "price": self.price,
            "image_url": self.image_url,
            "created_at": self.created_at,
            "type_offert": self.type_offert,
            "duration":self.duration,
            "location":self.location,
            "tags":self.tags,
            "imagedetails1":self.imagedetails1,
            "imagedetails2":self.imagedetails2,
            "imagedetails3":self.imagedetails3,
            "imagedetails4":self.imagedetails4,
            "rating":self.rating,
            "start_date": self.start_date,
            "end_date": self.end_date
        }