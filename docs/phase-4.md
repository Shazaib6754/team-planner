# Fase 4 – Filters en overzichten

## 1. Doel van deze fase

Het doel van fase 4 was om de Team Planner overzichtelijker te maken. Een teamleider moet snel medewerkers kunnen vinden en kunnen zien hoe de planning ervoor staat.

Daarom heb ik zoek- en filtermogelijkheden toegevoegd. Ook heb ik overzichten gemaakt waarin zichtbaar is hoeveel medewerkers per dag zijn ingepland en hoeveel dagen iedere medewerker deze week werkt.

Daarnaast worden taken gemarkeerd wanneer ze nog niet volledig bezet zijn.

## 2. Aanpak

Ik ben begonnen met het toevoegen van een zoekveld voor medewerkers. Hiermee kan gezocht worden op naam. Ook heb ik een filter toegevoegd waarmee medewerkers op functie geselecteerd kunnen worden.

Daarna heb ik het dagoverzicht uitgebreid. Per werkdag is nu zichtbaar hoeveel medewerkers zijn ingepland en welke medewerkers nog niet zijn ingepland.

In het weekoverzicht wordt per medewerker getoond op hoeveel verschillende dagen die persoon is ingepland. Meerdere taken op dezelfde dag tellen hierbij als één dag.

Tot slot heb ik een melding toegevoegd voor taken die nog niet volledig bezet zijn. Zodra het ingestelde maximum is bereikt, verschijnt de melding dat de taak vol is.

## 3. Componentenstructuur

De belangrijkste onderdelen die ik in deze fase heb aangepast zijn:

- `EmployeeList.tsx`: bevat het zoeken en filteren van medewerkers op naam en functie.
- `WeekView.tsx`: toont het aantal ingeplande dagen per medewerker voor de geselecteerde week.
- `WeekDayColumn.tsx`: toont per dag hoeveel medewerkers zijn ingepland, wie nog niet is ingepland en of een taak volledig bezet is.
- `useTeamPlanner.ts`: beheert de state en de functies voor medewerkers, taken en planningen.

## 4. Gemaakte keuzes

Ik heb ervoor gekozen om de zoek- en filterfunctie in `EmployeeList.tsx` te plaatsen. Hierdoor staan de zoekvelden en de resultaten bij elkaar.

De filters gebruiken de bestaande medewerkersgegevens. Met `filter()` wordt een nieuwe lijst gemaakt. De originele medewerkersgegevens worden niet aangepast. Hierdoor gaan er geen gegevens verloren wanneer een filter wordt gebruikt.

Voor het aantal ingeplande dagen gebruik ik een `Set`. Hierdoor telt een medewerker die op dezelfde dag meerdere taken heeft maar één keer mee.

De overzichten worden berekend vanuit de bestaande state. De berekende aantallen worden niet apart opgeslagen. Hierdoor blijven de overzichten automatisch aansluiten op de actuele planning.

Ik gebruik de custom hook `useTeamPlanner` om de state en de functies van de applicatie te beheren. Deze hook gebruikt React-hooks zoals `useState` en `useRef`. Een gewone functie kan deze React-hooks niet gebruiken. De custom hook zorgt ervoor dat de state en bijbehorende logica op één plek beheerd worden en door componenten gebruikt kunnen worden.

## 5. Problemen en oplossingen

Een belangrijk onderdeel was het correct tellen van de ingeplande dagen per medewerker.

Wanneer een medewerker meerdere taken op dezelfde dag heeft, mag dit niet als meerdere werkdagen worden geteld. Dit heb ik opgelost met een `Set`, zodat iedere werkdag maar één keer wordt meegeteld.

Ook moest het overzicht alleen de geselecteerde week laten zien. Daarom wordt de planning eerst gefilterd op de startdatum van de actieve week.

Bij het zoeken en filteren heb ik ervoor gezorgd dat alleen de getoonde lijst wordt aangepast. De originele medewerkersgegevens blijven behouden.

Ik heb de bezetting van taken uitgebreid met een duidelijke melding wanneer een taak nog niet volledig bezet is.

## 6. Testen

Ik heb de volgende onderdelen handmatig getest:

- Medewerkers zoeken op naam.
- Medewerkers filteren op functie.
- Zoeken en filteren tegelijk gebruiken.
- Een melding tonen wanneer er geen medewerkers gevonden zijn.
- Een medewerker toevoegen terwijl filters worden gebruikt.
- Per dag het aantal ingeplande medewerkers controleren.
- Controleren welke medewerkers niet ingepland zijn.
- Controleren of de dagoverzichten veranderen wanneer een planning wordt toegevoegd of verwijderd.
- Het aantal ingeplande dagen per medewerker controleren.
- Controleren of meerdere taken op dezelfde dag als één werkdag tellen.
- Controleren of de aantallen veranderen wanneer naar een andere week wordt gegaan.
- Controleren of een taak als niet volledig bezet wordt gemarkeerd.
- Controleren of een taak als vol wordt gemarkeerd wanneer het maximum is bereikt.

Ook heb ik `npm run build`, `npm run lint` en `git diff --check` uitgevoerd. Deze controles zijn zonder fouten uitgevoerd.

## 7. Gebruik van AI

Ik heb AI gebruikt als hulpmiddel bij het schrijven, controleren en verbeteren van de code.

Ook heb ik AI gebruikt om uitleg te krijgen over React, TypeScript, filters, berekeningen en custom hooks.

Ik heb de voorgestelde wijzigingen stap voor stap toegepast. Na de wijzigingen heb ik zelf gecontroleerd of de functies werkten en of de build en lint zonder fouten werden uitgevoerd.

## 8. Wat zou ik anders doen?

Bij een volgend project zou ik eerder nadenken over welke overzichten een gebruiker nodig heeft. Dan kan ik de componenten en berekeningen vanaf het begin beter indelen.

Ook zou ik meer tijd besteden aan het automatisch testen van de berekeningen en filters.

## 9. Wat heb ik geleerd?

Ik heb geleerd hoe ik gegevens kan filteren zonder de originele state te veranderen.

Ook begrijp ik beter hoe ik gegevens uit bestaande state kan gebruiken om overzichten en aantallen te berekenen.

Daarnaast heb ik geleerd hoe een `Set` gebruikt kan worden om dubbele waarden te voorkomen en hoe een custom hook helpt om state en logica op één plek te beheren.
