# AI Workflow Dokumentácia

**Meno:** Jozef Ketyi

**Dátum začiatku:** 26. 11. 2025

**Dátum dokončenia:** 26. 11. 2025

**Zadanie:** Frontend

---

## 1. Použité AI Nástroje

Vyplň približný čas strávený s každým nástrojom:

- [ ] **Cursor IDE:** _____ hodín
- [x] **Claude Code:** 2 hodiny
- [ ] **GitHub Copilot:** _____ hodín
- [x] **ChatGPT:** 10 min
- [ ] **Claude.ai:** _____ hodín
- [ ] **Iné:** 

**Celkový čas vývoja (priližne):** 2 hodiny

---

## 2. Zbierka Promptov

Vytvoril som samostatny MD subor: prompts.md (vid v projekte)

## 3. Problémy a Riešenia 

> 💡 **Tip:** Problémy sú cenné! Ukazujú ako riešiš problémy s AI.

### Problém #1: ChatGPT mi nevygeneroval prp tak ako ja som chcel

**Čo sa stalo:**
```
Poprosil som ChatGPT aby mi vygeneroval prp ku projektu, on mi dal generic output, ktory sa nedalo pouzit do MD suboru
```

**Prečo to vzniklo:**
```
Pravdepodobne moj prvy prompt nebol uplne jasny
```

**Ako som to vyriešil:**
```
Napisal som novy prompt aby mi dal output vo formate markdown code-u.
```

**Čo som sa naučil:**
```
Cim presnejsi prompt tym lepsie riesenie
```

**Screenshot / Kód:** [ ] Priložený

---

### Problém #2: Github OAUTH flow nefungoval out of the box

**Čo sa stalo:**
```
Claude vygeneroval github flow, ale ked som sa prihlasil do github, nevratil ma spat do applikacie
```

**Prečo:**
```
Chyba ale bola na mojej strane, neprecital som output od AI
```

**Riešenie:**
```
Postupoval som podla pokynov ktory mi Claude napisal do output a zaregistroval som externu applikaciu na github
```

**Learning:**
```
Citat output AI
```

## 4. Kľúčové Poznatky

### 4.1 Čo fungovalo výborne

**1.** 
```
Za mna vsetko fungovalo vyborne. Planning som sice robil trosku v hlave, a snazil som sa davat mensie tasky AI,
napriek tomu skoro celu appku mi vygeneroval na prvy prompt
```

---

### 4.2 Čo bolo náročné

**1.** 
```
V podstate nic mi neprislo narocne. Zabudol som sice na figmu, idem to teraz pridat :)
```

**2.** 
```
```

**3.** 
```
```

---

### 4.3 Best Practices ktoré som objavil

**1.** 
```
Citaj zadanie :D ... ale nie. Jednoznacne najlepsie cim specifickejsie zadat pre AI prompt,
ale dobre napisany PRP vie urobit zazraky
```

---

### 4.4 Moje Top 3 Tipy Pre Ostatných

**Tip #1:**
```
Najprv precitaj zadanie az potom zacni planovat.
```

**Tip #2:**
```
ChatGPT krasne vie vygenerovat PRP, claude zasa krasne vie nakodit celu appku.
```

**Tip #3:**
```
Treba citat output z AI
```

---

## 6. Reflexia a Závery

### 6.1 Efektivita AI nástrojov

**Ktorý nástroj bol najužitočnejší?** Claude Code

**Prečo?**
```
Je to workhorse. To ze nemusim copy/paste z ChatGPT je na nezaplatenie. Vie generovat viac suborov, celu strukturu appky
```

**Ktorý nástroj bol najmenej užitočný?** PHPStorm

**Prečo?**
```
Ked mi vsetko vygeneroval Claude, este aj git commit spravil :)
```

---

### 6.2 Najväčšie prekvapenie
```
Na tomto projekte som nenasiel ziadne prekvapenie, kedze sme tieto veci uz robili predtym,
ale na workshope ma prekvapilo, co som nevedel, ze kolko MCP serverov existuje
```

---

### 6.3 Najväčšia frustrácia
```
Mozno iba pocet tokenov ktore sa pouzivaju pri generovani
Tazko sa mu vysvetluje ze jeden element je trosku mimo, nakoniec som to spravil sam.
```

---

### 6.4 Najväčší "AHA!" moment
```
Ked som si vsimol ze mi Claude napisal do output ze mam zaregistrovat app na github aby fungoval OAuth login.
```

---

### 6.5 Čo by som urobil inak
```
Uz som pisal vyssie, asi by som mal najporv dvakrat precitat zadanie, lebo teraz este musim povedat AI nech pouziva styly z figmy
```

### 6.6 Hlavný odkaz pre ostatných
```
Nebojte sa pouzivat AI, ale iba vtedy ked na tom vas zivot nezavysi. Huby dajte radsej skontrolovat expertovi :)
```
