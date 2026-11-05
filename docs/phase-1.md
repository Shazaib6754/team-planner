
# Fase 1 – Fundament

## 1. Doel van deze fase

Het doel van fase 1 was om de basis van de Team Planner te bouwen. De applicatie is gemaakt met React, TypeScript, Vite en Tailwind CSS. De eerste versie toont medewerkers, taken en een weekplanning.

## 2. Aanpak

Ik ben begonnen met het opzetten van het React-project met TypeScript en Vite. Daarna heb ik Tailwind CSS toegevoegd voor de styling.

Vervolgens heb ik types gemaakt voor medewerkers, taken en geplande taken. Daarna heb ik voorbeeldgegevens toegevoegd, zodat ik de onderdelen van de applicatie kon testen.

Ik heb de interface verdeeld in aparte React-componenten. Hierdoor blijft de code overzichtelijk en kan ik onderdelen makkelijker aanpassen.

## 3. Componentenstructuur

De applicatie bestaat uit de volgende onderdelen:

- `App.tsx`: de hoofdpagina en koppeling tussen de componenten.
- `EmployeeList.tsx`: toont de medewerkers.
- `TaskList.tsx`: toont de beschikbare taken.
- `WeekView.tsx`: toont de planning van maandag tot en met vrijdag.
- `mockData.ts`: bevat de voorbeeldgegevens van medewerkers, taken en de planning.
- `types.ts`: bevat de TypeScript-types.

De componenten krijgen hun gegevens via props. De mockdata wordt ingelezen in `App.tsx` en doorgegeven aan de componenten die de gegevens nodig hebben.

## 4. Gemaakte keuzes

Ik heb gekozen voor TypeScript, omdat hiermee duidelijk wordt welke gegevens een medewerker of taak moet bevatten. Dit helpt om fouten in de code te voorkomen.

Ik heb de mockdata in een apart bestand gezet, zodat de gegevens niet door alle componenten heen verspreid staan.

Ook heb ik de applicatie verdeeld in kleinere componenten. Daardoor is de code makkelijker te begrijpen en te onderhouden.

Voor de styling heb ik Tailwind CSS gebruikt. Hiermee kan ik de vormgeving rechtstreeks met CSS-utilityclasses in de componenten instellen.

## 5. Problemen en oplossingen

Tijdens het bouwen heb ik regelmatig gecontroleerd of het project nog goed werkte. Hiervoor heb ik `npm run build` gebruikt.

Ik heb de onderdelen stap voor stap toegevoegd en na wijzigingen opnieuw gecontroleerd of de applicatie zonder fouten gebouwd kon worden.

## 6. Gebruik van AI

Ik heb AI gebruikt als hulpmiddel bij het opbouwen van het project, het uitleggen van React en TypeScript en het oplossen van mogelijke fouten.

Ik heb de code stap voor stap toegevoegd en na wijzigingen gecontroleerd of de applicatie nog werkte. Hierdoor kon ik beter begrijpen hoe de verschillende onderdelen samenwerken.

## 7. Wat zou ik anders doen?

Bij een volgend project zou ik vooraf nog duidelijker bepalen welke types, componenten en gegevens nodig zijn. Hierdoor kan ik de structuur vanaf het begin beter plannen.

## 8. Wat heb ik geleerd?

Ik heb geleerd hoe ik een React-project met TypeScript kan opzetten en hoe ik componenten maak die gegevens via props ontvangen.

Ook heb ik geleerd hoe ik types en mockdata apart organiseer en hoe ik Tailwind CSS gebruik om de applicatie vorm te geven.

Daarnaast heb ik geleerd om regelmatig een build uit te voeren en kleine wijzigingen met Git te committen.
