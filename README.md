![TEOS Sovereign Standing](https://img.shields.io/badge/Standing-Sovereign%20Original%20%E2%80%94%20Elmahrosa%20International-blue?style=for-the-badge)
[![License: TESL](https://img.shields.io/badge/License-TESL%20%2B%20PolyForm%20Noncommercial-green?style=for-the-badge)](https://github.com/Elmahrosa/Teos-Pharaoh-Portal/blob/main/TESL.md)

# 📍 Repo Standing Statement

This repository is a **sovereign original** under **Elmahrosa International — TEOS Egypt**.  
Governance is anchored in [TEOS-FORGE](https://github.com/Elmahrosa/TEOS-FORGE).  
Commercial use requires written approval from Elmahrosa International.  

⚖️ Protected under dual license: PolyForm Noncommercial + TEOS Egypt Sovereign License (TESL).

md)

> Copyright © 2025 Elmahrosa International. All Rights Reserved.  
> This material is NOT open source and is protected by the TEOS Egypt Sovereign License (TESL).  
> For the full license text, see [TEOS Egypt Sovereign License (TESL)](https://github.com/Elmahrosa/Teos-Pharaoh-Portal/blob/main/TESL.md).
> 
> **Initial Author:** Elmahrosa International  
> **Governing law and venue:** Cairo, Arab Republic of Egypt.

This commit adds missing scaffolding to enable:
 - IoT ingestion layer (MQTT → Postgres)
 - Pi AI microservices (basic classifier + alerts)
 - Badge automation (earned_badges.py)
 - UTF-8 safe SQL schema and emoji-safe restore script
 - Docker compose for local reproduction

Files added:
- /iot: sensors.py, mqtt_listener.py, exporter.py
- /ai: classifier.py, alerts.py, thresholds.json
- /scripts: earned_badges.py
- schema.sql, patch-restore-emojis.sql
- Dockerfiles and docker-compose.yml

See STRUCTURE.md for details and quick start.

## 🔗 Integration Summary
This repository is part of the **Elmahrosa Sovereign Stack**.  
Governance is anchored in **TEOS-FORGE**, with integrations across Bankchain, ERT-LAUNCH, FPBE, and other civic modules.  
See full details in [docs/integrations.md](https://github.com/Elmahrosa/TEOS-FORGE/blob/main/docs/integrations.md).

