import Main from "@/app/_sections/Main";
import Container from "@/components/Container";
import Services from "@/app/_sections/Services";
import Stages from "@/app/_sections/Stages";

export default function Home() {

    // sections: main, services, stages, projects, order, contacts
  return (
    <div>
        <Main />
        <Container>
            <Services />
            <Stages />
        </Container>
    </div>
  );
}
