const Rating = ({ rating }: { rating: string }) => {
    return (
        <div>
            <span>⭐ {rating} / 5.0</span>
        </div>
    );
};

export default Rating;
