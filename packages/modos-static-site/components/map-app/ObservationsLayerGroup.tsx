import React, { useEffect, useState } from 'react';
import { LatLng, Icon } from 'leaflet';
import { LayerGroup, Marker } from 'react-leaflet';
import { getObservations, IObservation, OBSTACLES_TYPE } from '../../libs/modos-api';
// import MarkerClusterGroup from 'react-leaflet-markercluster';
const modosIconSize: [number, number] = [ 15, 15 ];


const getIconFromObstacleType = (type: OBSTACLES_TYPE) => {

  for (const obstacleType in OBSTACLES_TYPE) {
    if (obstacleType === type) {
      return new Icon({
        iconUrl: `/assets/${obstacleType}-icon.png`,
        iconSize: modosIconSize
      });
    }
  }

  return new Icon({
    iconUrl: `/assets/${OBSTACLES_TYPE.OTHER}-icon.png`,
    iconSize: modosIconSize
  });

};

interface IProps {
  onObservationClick?: (observation: IObservation) => void;
}

const ObservationsLayerGroup = (props: IProps) => {
  const [ observations, setObservations ] = useState<IObservation[]>([]);

  useEffect(() => {
    getObservations()
      .then(result => {
        setObservations(result);
      })
      .catch(err => console.error(err));
  }, []);

  const test = observation => {
    // console.log(observation);
    props.onObservationClick(observation);
  };
  // For now Clustering is disabled as it impact a lot the perfomances of the interface
  // return (
  //   <MarkerClusterGroup>
  //     {observations?.map((observation, index) => {
  //       if (!observation?.location?.latitude || !observation?.location?.longitude) {
  //         return;
  //       }

  //       return <Marker
  //         key={index}
  //         position={new LatLng(observation.location.latitude, observation.location.longitude)}
  //         icon={getIconFromObstacleType(observation?.description?.obstacle)}
  //         onclick={() => props.onObservationClick(observation)}
  //       ></Marker>;
  //     })}
  //   </MarkerClusterGroup>
  // );
  return (
    <LayerGroup>
      {observations?.map((observation, index) => {
        if (!observation?.location?.latitude || !observation?.location?.longitude) {
          return;
        }

        return <Marker
          key={index}
          position={new LatLng(observation.location.latitude, observation.location.longitude)}
          icon={getIconFromObstacleType(observation?.description?.obstacle)}
          onclick={() => test(observation)}
        ></Marker>;
      })}
    </LayerGroup>
  );

};

export default ObservationsLayerGroup;