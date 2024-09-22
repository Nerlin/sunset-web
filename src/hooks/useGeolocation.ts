import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface IGeolocationPositionError {
  readonly code: number;
  readonly message: string;
  readonly PERMISSION_DENIED: number;
  readonly POSITION_UNAVAILABLE: number;
  readonly TIMEOUT: number;
}

export interface GeoLocationSensorResult extends GeoLocationSensorState {
  refresh(): void;
}

export interface GeoLocationSensorState {
  loading: boolean;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number | null;
  longitude: number | null;
  speed: number | null;
  timestamp: number | null;
  error?: Error | IGeolocationPositionError;
}

const useGeolocation = (options?: PositionOptions): GeoLocationSensorResult => {
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const [state, setState] = useState<GeoLocationSensorState>({
    loading: true,
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: Date.now(),
  });
  const [date, setDate] = useState(Date.now());

  const mounted = useRef(true);
  mounted.current = true;

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  });

  const onEvent = useCallback((event: GeolocationPosition) => {
    if (mounted.current) {
      console.log(event);
      setState({
        loading: false,
        accuracy: event.coords.accuracy,
        altitude: event.coords.altitude,
        altitudeAccuracy: event.coords.altitudeAccuracy,
        heading: event.coords.heading,
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed,
        timestamp: event.timestamp,
      });
    }
  }, []);

  const onEventError = useCallback((error: IGeolocationPositionError) => {
    if (mounted.current) {
      console.log(error);
      setState((oldState) => ({ ...oldState, loading: false, error }));
    }
  }, []);

  const refresh = useCallback(() => {
    setDate(Date.now());
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      onEvent,
      onEventError,
      optionsRef.current,
    );
  }, [date, onEvent, onEventError]);

  return useMemo(() => {
    return { ...state, refresh };
  }, [state, refresh]);
};

export default useGeolocation;
