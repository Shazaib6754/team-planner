
# Fase 2 – CRUD

## 1. Doel van deze fase

Het doel van fase 2 was om de Team Planner interactief te maken. In deze fase heb ik ervoor gezorgd dat een gebruiker zelf medewerkers en taken kan toevoegen, bewerken en verwijderen.

## 2. Aanpak

Ik ben begonnen met het maken van formulieren voor medewerkers en taken. Daarna heb ik functies toegevoegd waarmee gegevens kunnen worden toegevoegd, aangepast en verwijderd.

De gegevens worden beheerd in `App.tsx` met behulp van `useState`. Hierdoor worden wijzigingen direct weergegeven in de applicatie.

Ook heb ik controles toegevoegd om te voorkomen dat verplichte velden leeg blijven en dat medewerkers met dezelfde naam worden toegevoegd.

## 3. Componentenstructuur

De volgende componenten zijn gebruikt:

- `App.tsx`: beheert de state en de functies voor het aanpassen van gegevens.
- `Button.tsx`: een herbruikbare knop die op meerdere plekken wordt gebruikt.
- `EmployeeForm.tsx`: formulier voor het toevoegen en bewerken van medewerkers.
- `EmployeeList.tsx`: toont medewerkers en bevat de acties voor bewerken en verwijderen.
- `TaskForm.tsx`: formulier voor het toevoegen en bewerken van taken.
- `TaskList.tsx`: toont taken en bevat de acties voor bewerken en verwijderen.
- `WeekView.tsx`: toont de weekplanning.

## 4. Gemaakte keuzes

Ik heb ervoor gekozen om de state centraal in `App.tsx` te beheren. Hierdoor kunnen de verschillende componenten dezelfde gegevens gebruiken.

Voor het toevoegen en bewerken gebruik ik dezelfde formulieren. Met behulp van props wordt bepaald of een formulier een nieuw item toevoegt of een bestaand item aanpast.

Ook heb ik een herbruikbare `Button`-component gemaakt. Deze knop heeft verschillende varianten, zoals primary, secondary en danger.

Wanneer een medewerker of taak wordt verwijderd, worden ook de bijbehorende geplande taken uit de planning verwijderd. Zo blijven de gegevens met elkaar kloppen.

## 5. Problemen en oplossingen

Tijdens deze fase heb ik gewerkt aan de validatie van formulieren. Zo mogen namen niet leeg zijn en mogen medewerkers niet dezelfde naam hebben.

Bij taken wordt ook gecontroleerd of de titel en beschrijving zijn ingevuld en of de duur een positief geheel getal is.

Ook heb ik bevestigingsmeldingen toegevoegd voordat een medewerker of taak wordt verwijderd.

Na het aanpassen van de code heb ik de applicatie getest en regelmatig `npm run build` uitgevoerd om te controleren of er geen TypeScript- of buildfouten waren.

## 6. Gebruik van AI

Ik heb AI gebruikt als hulpmiddel bij het schrijven en controleren van code en bij het oplossen van fouten.

Ook heb ik AI gebruikt om uitleg te krijgen over React, TypeScript, state en componenten. Ik heb de code stap voor stap toegevoegd en zelf gecontroleerd of de onderdelen werkten.

## 7. Wat zou ik anders doen?

Bij een volgend project zou ik vooraf beter nadenken over de structuur van de componenten en de functies. Ook zou ik vanaf het begin consequenter letten op de schrijfwijze en opmaak van mijn code.

## 8. Wat heb ik geleerd?

Ik heb geleerd hoe ik CRUD-functionaliteit kan bouwen met React en TypeScript.

Ook begrijp ik beter hoe `useState` werkt en hoe je gegevens via props tussen componenten doorgeeft.

Daarnaast heb ik geleerd hoe je formulieren valideert, bevestigingen gebruikt bij verwijderen en herbruikbare componenten maakt.
