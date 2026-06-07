export type PatrolType = 'zivil' | 'dienst' | 'radar' | 'unbekannt';

export interface Sighting {
  id: string;
  username: string;
  phone?: string;
  message: string;
  area: string;
  patrolType: PatrolType;
  latitude: number;
  longitude: number;
  timestamp: Date;
  timeLabel: string;
}

// Around Bezirk Schärding, Upper Austria (48.4°N, 13.4°E)
export const MOCK_SIGHTINGS: Sighting[] = [
  {
    id: '1',
    username: 'Niklas Hubinger',
    phone: '+43 676 6102625',
    message: 'Esternberg durch 🚔',
    area: 'Esternberg',
    patrolType: 'dienst',
    latitude: 48.4368,
    longitude: 13.5263,
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    timeLabel: '13:31',
  },
  {
    id: '2',
    username: 'Alexander Widegger',
    phone: '+43 660 1566493',
    message: 'Eisenbirn ause Richtung Ludham',
    area: 'Eisenbirn',
    patrolType: 'zivil',
    latitude: 48.4502,
    longitude: 13.4831,
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    timeLabel: '20:26',
  },
  {
    id: '3',
    username: 'Joni',
    phone: '+43 681 84909977',
    message: 'Raab durch',
    area: 'Raab',
    patrolType: 'dienst',
    latitude: 48.3615,
    longitude: 13.6538,
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    timeLabel: '21:27',
  },
  {
    id: '4',
    username: 'Drumme Bua',
    phone: '+43 677 64773524',
    message: 'Wienertsham durch Richtung azs',
    area: 'Wienertsham',
    patrolType: 'zivil',
    latitude: 48.4112,
    longitude: 13.5987,
    timestamp: new Date(Date.now() - 55 * 60 * 1000),
    timeLabel: '21:32',
  },
  {
    id: '5',
    username: 'Çiňe',
    phone: '+43 677 64277664',
    message: 'Wernstein Motorikpark vorbei',
    area: 'Wernstein',
    patrolType: 'radar',
    latitude: 48.5021,
    longitude: 13.4412,
    timestamp: new Date(Date.now() - 75 * 60 * 1000),
    timeLabel: '21:53',
  },
  {
    id: '6',
    username: 'Çiňe',
    phone: '+43 677 64277664',
    message: 'Richtung Schärding ause',
    area: 'Schärding',
    patrolType: 'unbekannt',
    latitude: 48.4539,
    longitude: 13.4347,
    timestamp: new Date(Date.now() - 76 * 60 * 1000),
    timeLabel: '21:53',
  },
  {
    id: '7',
    username: 'Kilian Jerabek',
    phone: '+43 664 4014084',
    message: 'Kiwara ziang leid ausa Münzkircha feitinger 🚓',
    area: 'Münzkirchen',
    patrolType: 'dienst',
    latitude: 48.4721,
    longitude: 13.5623,
    timestamp: new Date(Date.now() - 90 * 60 * 1000),
    timeLabel: '22:35',
  },
];

export const PATROL_TYPE_LABELS: Record<PatrolType, string> = {
  dienst: 'Streife',
  zivil: 'Zivil',
  radar: 'Radar',
  unbekannt: 'Unbekannt',
};

export const PATROL_TYPE_COLORS: Record<PatrolType, string> = {
  dienst: '#1a6bcc',
  zivil: '#f4a261',
  radar: '#e63946',
  unbekannt: '#4a5568',
};

export const GROUP_INFO = {
  name: 'Sichtungen Bezirk Schärding',
  members: 525,
  description:
    'Diese Gruppe dient zur Standortverbreitung von zivilen und dienstlichen Polizeistreifen 🚔',
};
