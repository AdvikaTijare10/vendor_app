-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: venmgmt
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `vendorinfo`
--

DROP TABLE IF EXISTS `vendorinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendorinfo` (
  `S No.` int NOT NULL AUTO_INCREMENT,
  `VENCD` text,
  `Vendor` text,
  `Sample Submission Date` text,
  `Material Specification Number` text,
  `Material Specification Name` text,
  `PMD` text,
  `Indent No` text,
  `Indent Date` text,
  `INDDEV` text,
  `PO No.` text,
  `PO Date` text,
  `PO-VAL(Rs.Lacs)` text,
  `Approx Business Volume per annum in Rs.Lacs(As on 18.12.2024)` text,
  `Vendor already in PMD(1V/2V/3V)` text,
  `Vendor development/Approval Status` text,
  `Remark` text,
  PRIMARY KEY (`S No.`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendorinfo`
--

LOCK TABLES `vendorinfo` WRITE;
/*!40000 ALTER TABLE `vendorinfo` DISABLE KEYS */;
INSERT INTO `vendorinfo` VALUES (1,'40217','SAHNEY KIRKWOOD PVT. LTD.','','TG60260','EPOXY GLASS FABRIC TAPE ','I0411 EPOXY GLASS FABRIC TAPE TG60260, Rotor Interturn Insulation','20202214','09.09.2020','1','20210066','10.05.2021','1.95','34.9','2','Vendor approved and already added in PMD.',''),(2,'20253','3A ASSOCIATES INCORPORATED','','HW29999/AM39014','BRAIDED GLASS SLEEVE FLAT LAVAPRENE IMPREGNATED ','I1410 Levaprene Sleeve, ','20221518','01.10.22','1','20221374','15.12.22','1.43','3.71','','Vendor approved and already added in PMD.',''),(3,'22782','CHINTAMANI ELMECH SOLUTIONS','','HW25084','MOULDING MICANITE SHEETS ALKYD VINYL BONDED ','I0306 AV Moulding Micanite, ','20223012','11.02.23','1','20230307','18.05.23','0.05','0.84','','Vendor approved and already added in PMD.',''),(4,'22782','CHINTAMANI ELMECH SOLUTIONS','','HW27560','ALKYD VINYL VARNISH ','I2002 Alkyd Vinyl Varnish, ','20223014','11.02.23','1','20230309','18.05.23','0.04','˜0.15','','Vendor approved and already added in PMD.',''),(5,'22782','CHINTAMANI ELMECH SOLUTIONS','','HW25098','MOULDING MICANITE ','I0404 Moulding Micanite, ','20230583','26.05.23','1','20231675','04.12.23','1.09','˜55.71','','Vendor approved and already added in PMD.',''),(6,'22782','CHINTAMANI ELMECH SOLUTIONS','','HW25287','MICA SPLITTING TAPE WITH ACCELERATOR ','I0113 Mica Splitting Tape, ','20231154','15.07.23','1','20231437','21.10.23','4.15','225.3','','PO NO:E3C1437 REVNO:2, Dated:21.10.2023,\nPO Quantity: 20000 Metre, Material Received, SRV Cleared.\nMaterial under further Technical Evaluation/Shop Trial/Restricted use (Singrauli Stator).\nFurther 5000 Metre Improved free sample received from vendor. Material under Technical Evaluation',''),(7,'40427','ISOVOLTA (INDIA) PVT. LIMITED','','HW27869','SEMI CONDUCTING VARNISH (VARNISH NO. 8001) , ECP Varnish','I1701 CONDUCTING/SEMI-CONDUCTING VARNISHES (VARNISH NO. 8001) , ECP Varnish','20232523','30.10.23','1','20232194','09.02.24','0.75','','','PO NO:E3C2194 REVNO: Dated:09.02.2024,\nPO Quantity: 25 KG,\nSRV No. G202430039 not cleared yet.\nMaterial received, under Technical Evaluation.\nShop Trial: ECP Coating done on 16 Nos of Mejia THW Bars. These 16 Nos (06 Bars on 11.12.24, 04 Bars on 14.12.24 and 06 Bars on 18.12.24) THW Bars successfully passed in HV (49 kV for 1 Minute). Shop feedback received. SRV No. G202430039, SRV Cleared. Restricted use (Lower Voltages upto 16.5kV). Further Improvement in material required for using in Siemens design Genarator Bars up 21 kV',''),(8,'19294','AHMEDABAD TEXTILE INDUSTRIES','','AA22415','EPOXY LAMINATED GLASS FABRIC BASE SHEET(TEMPERATURE INDEX 155) ','I0706 Epoxy Glass Laminate','20233051','13.12.23','1','20232630','28.03.24','1.65','235.87','','PO placed.\nMaterial received, C Note U202401105, Dated 20.03.2025.',''),(9,'40217','SAHNEY KIRKWOOD PVT. LTD.','','HW23768','CONDUCTIVE HARD FLEECE SHEET ','I0709 CONDUCTIVE HARD FLEECE S','20233302','05.01.2024','1','20240028','02.04.24','0.47','21.45','2','PO placed.\nMaterial not received yet (Supplier Press is under Repair).\nVendor registered in PMD as developmental Vendor. Vendor to update regarding probable date of supply.',''),(10,'2719','GLASS FIBRE & ALLIED','','HW25795','POLYESTER GLASS MAT SHEET ','I0710 PGM Sheet, ','20233311','10.01.24','1','20240305','10.05.24','1.02','˜5.04','8','PO NO:E4C0305 REVNO: Dated:10.05.2024,\nSRV No. +G202430344 Cleared.\nShop Trial done (machining done in ID Shop.). Shop Feedback OK received.',''),(11,'2719','GLASS FIBRE & ALLIED','','AA22414','EPOXY GLASS MAT LAMINATED SHEETS','I0705 EPOXY GLASS MAT LAMINATED SHEETS','20234043','06.03.24','1','20240880','24.07.24','1.18','','5','PO NO:E4C0880 REVNO: Dated:24.07.2024,\nSRV No. G202430414 not cleared yet.\nShop Trial done (machining done in ID Shop.). Shop Feedback OK received. Vendor to be asked for registration in PMD.',''),(12,'22782','CHINTAMANI ELMECH SOLUTIONS','','FLM24230','FLEXIBLE MICANITE ','I0309 FLEXIBLE MICANITE ','20240272','27.04.24','1','20240617','19.06.24','1.76','˜5.15','4','SRV No. +G202430410, SRV Date: 16-09-2024\nSRV not cleared yet.\nMaterial received, OK in CPL testing. Shop Trial done. Shop feedback received. SRV to be cleared. SRV accepted as per ISE and CPL. To be recommended for addition in PMD.',''),(13,'22782','CHINTAMANI ELMECH SOLUTIONS','','AA25101','RESIN RICH EPOXY NOVOLAK BONDED GLASS BACKED MICA PAPER TAPE','I0101 RESIN RICH EPOXY NOVOLAK BONDED GLASS BACKED MICA PAPER TAPE ','20240895','08.06.24','1','20241515','15.10.24','4.23','˜84','4','PO (20241515) placed.\nMaterial ready at vendor works. To be dispatched.',''),(14,'40427','ISOVOLTA (INDIA) PVT. LIMITED','','HW23797','CONDUCTIVE FLEECE TAPE , ICP Tape','I0602 CONDUCTIVE FLEECE TAPE , ICP Tape','20241164','28.06.2024','1','20241765','16.11.2024','1.25','˜18.76','2','PO placed.\nVendor registration Completed (18 Dec, 2024).\nSRV No. T202430083,\nSRV Date: 18-01-2025,\nMaterial received, under Type testing in CPL.',''),(15,'40427','ISOVOLTA (INDIA) PVT. LIMITED','','HW22894/\nTG60159','CONDUCTIVE POLYESTER FLEECE , OCP Wrapper','I0601 CONDUCTIVE POLYESTER FLEECE, , OCP Wrapper','20242203','16.09.2024','1','20241901','09.12.2024','0.70063','12.61','1','Vendor registration Completed\n(18 Dec, 2024).\nSRV No. T202430089,\nSRV Date: 21-01-2025,\nMaterial received, under Type testing in CPL.',''),(16,'20337','CHETAK MANUFACTURING CO.','','TG60140','INSULATING ENAMEL RED ','I2110 INSULATING ENAMEL RED','20242356','03.10.2024','1','20242310','05.02.2025','0.0944','˜5.28','2','Development PO placed.',''),(17,'20337','CHETAK MANUFACTURING CO.','','HW27879','DIMETHYL BENZYL AMINE ','I1514 DIMETHYL BENZYL AMINE','20242359','03.10.2024','1','20242309','06.02.2025','0.0708','0.1','5','Development PO placed.',''),(18,'20337','CHETAK MANUFACTURING CO.','','HW27796','DILUENT C ','I1509 DILUENT C','20242548','21.10.2024','1','20242240','25.01.2025','0.0568','˜0.6','2','Development PO placed.',''),(19,'40217','SAHNEY KIRKWOOD PVT. LTD.','','TG-WIS-0690','MANUFACTURE OF WRAPPER INSULATION & INSULATION TUBES WITH EPOXY GLASS FABRIC & NOMEX PAPER TG-WIS-0690','I2530 INSULATION SLEEVE','20242251','26.10.2024','1','20241879','06.12.2024','0.026','˜0.93','3','Development PO placed. Material received, under Shop Trial, Shop Feedback OK received.Vendor registered in PMD as developmental Vendor. MISCC MOM for Development to Permanent Category change to be issued.',''),(20,'9430','POLYTECH ENTERPRISES','','HW25795','POLYESTER GLASS MAT SHEET	(CLAMPING PLATE)','I2514 INSULATING COMPONENTS, Clamping Plate ','20202186','09.09.20','1','20210291','25.06.21','3.72','39.95','','PDI awaited from vendor.',''),(21,'9430','POLYTECH ENTERPRISES','','TG60251','TUBES MADE FROM INSULATING MATERIAL','I2525 INSULATING COMPONENTS ','20202193','08.09.20','1','20210088','21.05.21','0.18','13.23','','PDI awaited from vendor.',''),(22,'18179','BARODA MOULDS & DIES','','TG60409	','TERMINAL BUSHING FOR HYDROGEN AND WATER COOLED GENERATORS','I2526 INSULATING COMPONENTS ','20212864','12.03.22','1','20221462','29.12.22','43.18','564.64','','PO placed.\nMaterial not received yet. Vendor asked delevery extension till Feb 2025, July 2025.',''),(23,'20253','3A ASSOCIATES INCORPORATED','','HW29974/HW29973','SILICONE COMPOUNDS ','I1604 SILICONE COMPOUNDS ','','','','','','','','','Vendor registered in PMD as developmental Vendor. Development Indent to be issued.',''),(24,'40217','SAHNEY KIRKWOOD PVT. LTD.','','AA22431','FIBRE GLASS REINF. PLASTIC ROD ','I2536 INSULATING COMPONENTS ,\nFIBRE GLASS REINF. PLASTIC ROD	',NULL,NULL,NULL,NULL,NULL,NULL,'','','Vendor is being cleared in GEM Enquiry.\nPOs were placed.\nVendor will be asked for registration in PMD.',''),(25,'40217','VIJAY MERCENTILE','','AA21115','HARD PRESS BOARD - SOLID - FOR CAPACITOR ','I1113 PAPERS, FLEECE, FELTS, FILMS & SHEETS ',NULL,NULL,NULL,NULL,NULL,NULL,'','','Vijay Mercentile under development.',''),(26,'20253','3A ASSOCIATES INCORPORATED','','HW22699','SELF AMALGAMATING / FUSING TAPE  ','I0205 SELF AMALGAMATING / FUSING TAPE ',NULL,NULL,NULL,NULL,NULL,NULL,'','','3A under development.','');
/*!40000 ALTER TABLE `vendorinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-13  1:14:33
