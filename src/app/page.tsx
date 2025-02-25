import Container from "@mui/material/Container";
import Homepage from "./Homepage";
import styles from "./page.module.css";

export default function Home() {
  return (
    <Container className={styles.page}>
      <Homepage />
    </Container>
  );
}
