import styles from "../../styles/About.module.css";
import { useRouter } from "next/router";
import image from "../../src/assets/image2 - Copy.jpg";
import image2 from "../../src/assets/IMG_7504.jpeg";
import Image from "next/image";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function About({ about }) {
  const router = useRouter();

  const [openMoreAboutMe, setOpenMoreAboutMe] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <section className={styles.about} ref={about}>
        <h1 className={styles.aboutTitle}>
          <span className={styles.importantWords}>About</span> Me
        </h1>
        <div className={styles.aboutTextWrapper}>
          <p className={styles.aboutPara}>
            I’m <span className={styles.importantWords}>Elie Mitri</span>, a
            <span className={styles.importantWords}>
              {" "}
              16-year-old powerlifter
            </span>{" "}
            and proud national champion in the under-93kg sub-junior category in
            Lebanon.
          </p>
          <div className={styles.aboutPicWrapper}>
            <Image src={image} className={styles.aboutPic}></Image>
          </div>
        </div>
        <div className={styles.aboutTextWrapper}>
          <div className={styles.aboutPicWrapper}>
            <Image src={image2} className={styles.aboutPic}></Image>
          </div>
          <p className={styles.aboutPara}>
            <span className={styles.importantWords}></span>
            My journey in{" "}
            <span className={styles.importantWords}>powerlifting</span> began
            with a commitment to pushing past personal limits and growing
            stronger every day. With the guidance of an incredible{" "}
            <span className={styles.importantWords}>coach</span>, I’ve dedicated
            countless hours to refining my technique and building the strength
            needed to compete and succeed. Winning nationals was a milestone,
            but it's only the{" "}
            <span className={styles.importantWords}>beginning</span>. I’m
            excited to keep challenging myself and pursuing new records on this
            path in competitive powerlifting.
          </p>
        </div>
        <div>
          <button onClick={handleOpen} className={styles.knowMoreButton}>
            Wanna know more?
          </button>
        </div>

          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} className={styles.modalAbout}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography>
              </Box>
            </Modal>
          </div>
      
      </section>
    </>
  );
}
