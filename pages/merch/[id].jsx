import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { data } from "../../Data.js";
import Image from "next/image";
import styles from "../../styles/PickedItem.module.css";
import { MdOutlineShoppingCart, MdArrowBack } from "react-icons/md";

export default function Rating() {
  const router = useRouter();
  const { id } = router.query;
  const [pickedItem, setPickedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const item = data.find((item) => item.id.toString() === id);
      setPickedItem(item);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pickedItem) {
    return <div>Item not found</div>;
  }

  return (
    <div className={styles.itemWrapper}>
      <MdArrowBack
        onClick={() => router.push("/merch")}
        className={styles.backBtn}
      />
      <figure className={styles.itemPicWrapper}>
        <Image
          src={pickedItem.url}
          alt={`Merchandise ${pickedItem.id}`}
          width={300}
          height={300}
          priority
          className={styles.itemImage}
        />
      </figure>
      <div className={styles.itemDetails}>
        <h1>{pickedItem.name}</h1>
        {pickedItem.salePrice === null ? (
          <div>
            <h5 className="prices">{pickedItem.originalPrice}</h5>
          </div>
        ) : (
          <div>
            <h5 className="prices">
              <span className="sale__active">{pickedItem.originalPrice}</span>
              <span>{pickedItem.salePrice}</span>
            </h5>
          </div>
        )}
        <p className={styles.itemPara}>{pickedItem.details}</p>
      </div>
    </div>
  );
}
