
import type { Employee, Task } from '../types'

export const employees: Employee[] = [
  { id: 1, name: 'Sam de Vries', role: 'Monteur' },
  { id: 2, name: 'Sara Jansen', role: 'Planner' },
  { id: 3, name: 'Mohammed Ali', role: 'Magazijnmedewerker' },
  { id: 4, name: 'Lisa Bakker', role: 'Monteur' },
  { id: 5, name: 'Daan Visser', role: 'Technicus' },
  { id: 6, name: 'Noor Smit', role: 'Planner' },
  { id: 7, name: 'Youssef Ahmed', role: 'Technicus' },
  { id: 8, name: 'Emma Bos', role: 'Magazijnmedewerker' },
]

export const tasks: Task[] = [
  {
    id: 1,
    title: 'Onderhoud uitvoeren',
    description: 'Gepland onderhoud aan een machine',
    duration: 120,
  },
  {
    id: 2,
    title: 'Voorraad controleren',
    description: 'Controleren en aanvullen van de voorraad',
    duration: 60,
  },
  {
    id: 3,
    title: 'Klantbezoek',
    description: 'Technische controle bij een klant',
    duration: 90,
  },
  {
    id: 4,
    title: 'Werkplanning maken',
    description: 'De werkzaamheden voor de volgende week plannen',
    duration: 45,
  },
]
