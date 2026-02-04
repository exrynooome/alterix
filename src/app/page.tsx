import Main from "@/app/_sections/Main";
import Container from "@/components/Container";
import Services from "@/app/_sections/Services";

export default function Home() {

    // sections: main, services, stages, projects, order, contacts
  return (
    <div>
        <Main />
        <Container>
            <Services />
        </Container>
    </div>
  );
}
