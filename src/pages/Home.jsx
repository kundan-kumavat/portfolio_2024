import { Suspense } from "react";

import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import Island from "../models/Island";
import Sky from "../models/Sky";

const Home = () => {

    const adjustIslandForScreenSize = () => {
        let screenScale, screenPosition;
        let rotation = [0.1, 4.7, 0];
    
        if (window.innerWidth < 768) {
          screenScale = [0.9, 0.9, 0.9];
          screenPosition = [0, -6.5, -43.4];
        } else {
          screenScale = [0.7, 2, 1];
          screenPosition = [2000, -300.5, -43.4];
        }
    
        return [screenScale, screenPosition, rotation];
      };

      const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSize();

    return(
        <section className="w-full h-screen relative">
            <Canvas 
            className="w-full h-screen bg-transparent"
            camera={{near: 0.2, far: 1000}}
            >
                <Suspense fallback={<Loader />}>
                  <directionalLight position={[1, 1, 1]} intensity={2} />
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 5, 10]} intensity={2} />
                  <spotLight
                  position={[0, 50, 10]}
                  angle={0.15}
                  penumbra={1}
                  intensity={2}
                  />
                <hemisphereLight
                  skyColor='#b1e1ff'
                  groundColor='#000000'
                  intensity={1}
                />

                <Sky />
                <Island
                  position = {islandPosition}
                  scale = {islandScale}
                  rotation={islandRotation}
                />
              </Suspense>
            </Canvas>
        </section>
    )
}

export default Home;