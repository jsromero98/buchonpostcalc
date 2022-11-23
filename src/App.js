import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Card } from 'primereact/card';
import { Accordion, AccordionTab } from 'primereact/accordion';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";  
import "/node_modules/primeflex/primeflex.css";                              //icons
import { useState } from 'react';
import "./App.css";

const App = () => {
  let [masaAProducir,setMasaAProducir] = useState(2.5);
  let [precioProducto,setPrecioProducto] = useState(5000);
  let [tiempoSecado,setTiempoSecado] = useState(15);
  let [temperaturaSecado,setTemperaturaSecado] = useState(100);
  let humedadInicialBuchon = 80;
  let humedadFinalBuchon = 40;
  let [masaBuchonNecesario100,setMasaBuchonNecesario100] = useState(0);
  let [masaBuchonNecesario80,setMasaBuchonNecesario80] = useState(0);
  let [masaMateriaOrganica,setMasaMateriaOrganica] = useState(0);
  let [aguaEvaporada,setAguaEvaporada] = useState(0);
  let velocidadAire = 10.2;
  let areaFlujo = (0.205*0.205)/2;
  let caudalAire = velocidadAire*areaFlujo;
  let relacionReflujo = 85;
  let caudalAirePorMasa = 1000*((caudalAire/0.2787)*(1-(relacionReflujo/100)));
  let [energiaCalentar1M3Aire65,setEnergiaCalentar1M3Aire65] = useState(0);
  let [volumenAireNecesario,setVolumenAireNecesario] = useState(0);
  let [energiaSecado,setEnergiaSecado] = useState(0);
  let precioEnergia = 2246.16/11.7;
  let [costoSecado,setCostoSecado] = useState(0);
  let densidadCompost = 0.3;
  let [volumenCompostaje,setVolumenCompostaje] = useState(0);
  let [areaNecesaria, setAreaNecesaria] = useState(0);
  let costoPlantaPorTonelada = 671000000/39.24;
  let [costoPlanta,setCostoPlanta] = useState(0);
  let [costoProducto,setCostoProducto] = useState(0);
  let [gananciaUnidad,setGananciaUnidad] = useState(0);
  let [tiempoRetornoInversión, setTiempoRetornoInversion] = useState(0);

  const calcular = () => {
    setMasaBuchonNecesario100(masaAProducir*((1-(humedadFinalBuchon/100))/(1-(humedadInicialBuchon/100))));
    setMasaBuchonNecesario80(masaBuchonNecesario100*0.8);
    setMasaMateriaOrganica(masaBuchonNecesario100-masaBuchonNecesario80);
    setAguaEvaporada(masaBuchonNecesario80*(humedadInicialBuchon-humedadFinalBuchon)*0.01);
    setEnergiaCalentar1M3Aire65((1.1944*1006*(temperaturaSecado-20))/1000);
    setVolumenAireNecesario(caudalAirePorMasa*masaBuchonNecesario80*(tiempoSecado*60));
    setEnergiaSecado((energiaCalentar1M3Aire65*volumenAireNecesario)/(3600));
    setCostoSecado(precioEnergia*energiaSecado*0.77);
    setVolumenCompostaje((masaAProducir*1000)/densidadCompost);
    setAreaNecesaria((volumenCompostaje/1000)/0.5);
    setCostoPlanta(costoPlantaPorTonelada*masaAProducir);
    setCostoProducto((costoSecado/masaAProducir)*(2/1000));
    setGananciaUnidad(precioProducto-costoProducto);
    setTiempoRetornoInversion(costoPlanta/(gananciaUnidad*1000));
  }

  return (
    <div className="flex flex-column flex-grow-1 bg-green-900 bg-repeat fullHeight">
      
      <div className="flex flex-column md:flex-row m">
        <div className="flex flex-column m-3">
          <div className="flex flex-row align-items-center p-3">
            <div className="flex flex-column align-self-center">
              <h1 className="flex align-self-center m-1 font-bold text-3xl text-white">Buchonpost calculator</h1>
            </div>
          </div>
          <Card className='bg-green-100'>
            <p>Masa a producir</p>
            <InputNumber className="flex m-2" mode="decimal" value={masaAProducir} onValueChange={(e) => setMasaAProducir(e.value)} suffix=" Ton/mes"/>
            <p>Precio de 1kg de compost</p>
            <InputNumber className="flex m-2" mode="decimal" value={precioProducto} onValueChange={(e) => setPrecioProducto(e.value)} suffix=" COP"/>
            <p>Tiempo de secado</p>
            <InputNumber className="flex m-2" mode="decimal" value={tiempoSecado} onValueChange={(e) => setTiempoSecado(e.value)} suffix=" min"/>
            <p>Temperatura de secado</p>
            <InputNumber className="flex m-2" mode="decimal" value={temperaturaSecado} onValueChange={(e) => setTemperaturaSecado(e.value)} suffix=" °C"/>
            <Button className='flex m-2 green-200 p-button-success' label="Calcular" onClick={calcular}/>
          </Card>
        </div>
        <div className="flex flex-column flex-grow-1 m-3">
          <Card className='bg-green-100 m-2'>
            <div className="flex flex-column">
              <div className="flex flex-row">
                <div className="flex flex-column"><p>Masa de buchon necesario</p></div>
                <div className="flex flex-column justify-self-end"><InputNumber readOnly={true} value={masaBuchonNecesario80} suffix=" Ton/mes"></InputNumber></div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-column"><p>Masa de materia orgánica</p></div>
                <div className="flex flex-column"><InputNumber readOnly={true} value={masaMateriaOrganica} suffix=" Ton/mes"></InputNumber></div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-column"><p>Area necesaria</p></div>
                <div className="flex flex-column"><InputNumber readOnly={true} value={areaNecesaria} suffix=" m²"></InputNumber></div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-column"><p>Costo de energía para el secado</p></div>
                <div className="flex flex-column"><InputNumber readOnly={true} value={costoSecado} suffix=" COP/mes"></InputNumber></div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-column"><p>Costo de la planta</p></div>
                <div className="flex flex-column"><InputNumber readOnly={true} value={costoPlanta} suffix=" COP"></InputNumber></div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-column"><p>Tiempo estimado para retorno de inversión</p></div>
                <div className="flex flex-column"><InputNumber readOnly={true} value={tiempoRetornoInversión} suffix=" años"></InputNumber></div>
              </div>
            </div>
          </Card>
          <Accordion className='m-2'>
            <AccordionTab header="Mas info">
              <Card className='bg-green-100 m-2'>
                <div className="flex flex-column">
                  <div className="flex flex-row">
                    <p className='font-bold'>Humedad</p>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Humedad inicial del buchón</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={humedadInicialBuchon} suffix=" %"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Humedad final del buchón</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={humedadFinalBuchon} suffix=" %"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Masa de buchón necesario (solo buchón)</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={masaBuchonNecesario100} suffix=" Ton/mes"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Masa de buchón necesario (20% materia orgánica)</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={masaBuchonNecesario80} suffix=" Ton/mes"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Masa de materia orgánica</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={masaMateriaOrganica} suffix=" Ton/mes"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Agua evaporada</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={aguaEvaporada} suffix=" Ton/mes"></InputNumber></div>
                  </div>
                </div>
              </Card>
              <Card className='bg-green-100 m-2'>
                <div className="flex flex-column">
                  <div className="flex flex-row">
                    <p className='font-bold'>Secado</p>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Velocidad del aire</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={velocidadAire} suffix=" m/s"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Área de flujo</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={areaFlujo} suffix=" m²"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Caudal del aire</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={caudalAire} suffix=" m³/s"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Relación de reflujo</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={relacionReflujo} suffix=" %"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Caudal de aire por unidad de masa</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={caudalAirePorMasa} suffix=" m³/s*Ton"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Energia para calentar 1 m³ de aire a 65°C</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={energiaCalentar1M3Aire65} suffix=" kJ"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Volumen de aire necesario</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={volumenAireNecesario} suffix=" m³/mes"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Energia para secado</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={energiaSecado} suffix=" kWh/mes"></InputNumber></div>
                  </div>
                </div>
              </Card>
              <Card className='bg-green-100 m-2'>
                <div className="flex flex-column">
                  <div className="flex flex-row">
                    <p className='font-bold'>Costo del Secado</p>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Precio energía (COL)</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={precioEnergia} suffix=" COP/kWh"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Costo del secado</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={costoSecado} suffix="COP"></InputNumber></div>
                  </div>
                </div>
              </Card>
              <Card className='bg-green-100 m-2'>
                <div className="flex flex-column">
                  <div className="flex flex-row">
                    <p className='font-bold'>Area necesaria</p>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Densidad del compost</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={densidadCompost} suffix=" kg/L"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Volumen del compostaje</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={volumenCompostaje} suffix=" L"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Area necesaria</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={areaNecesaria} suffix=" m²"></InputNumber></div>
                  </div>
                </div>
              </Card>
              <Card className='bg-green-100 m-2'>
                <div className="flex flex-column">
                  <div className="flex flex-row">
                    <p className='font-bold'>Finanzas</p>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Costo de planta por tonelada de producto</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={costoPlantaPorTonelada} suffix=" COP/Ton"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Costo de la planta</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={costoPlanta} suffix=" COP"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Costo de producción</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={costoProducto} suffix=" COP/kg"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Precio de venta</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={precioProducto} suffix=" COP/kg"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Ganancia por unidad</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={gananciaUnidad} suffix=" COP/kg"></InputNumber></div>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-column"><p>Tiempo para recuperar inversión</p></div>
                    <div className="flex flex-column"><InputNumber readOnly={true} value={tiempoRetornoInversión} suffix=" años"></InputNumber></div>
                  </div>
                </div>
              </Card>
            </AccordionTab>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default App;
