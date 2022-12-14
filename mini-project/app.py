#!/usr/bin/env python
import pymongo
import psutil
import time
from pymongo import MongoClient

client = MongoClient("13.124.208.24:27017")
#디비연결
db = client.linux
col_cpu = db.cpus
col_mem = db.memories
print(col_cpu)
print(col_mem)

doc_cpu = col_cpu.find({}, {"_id":0})
doc_mem = col_mem.find({}, {"_id":0})

for i in doc_cpu:
    print(i)

for i in doc_mem:
    print(i)

cpuIns = psutil.cpu_percent()
print(cpuIns)

cpuTimes = psutil.cpu_times_percent()
print(cpuTimes)
print(cpuTimes.idle)
#cpu break

cpuWork=int(100-cpuTimes.idle)
#work cpu
print(cpuWork)

cpuFreq = psutil.cpu_freq()
cpu_freq = f'{str(cpuFreq.current/1024)} GHz'

cpu_count = psutil.cpu_count(logical=False)
print(cpu_count)

memIns = psutil.virtual_memory()
memTo = memIns.total/1024**3
print(memTo)
memRound = f'{round(memTo)} GB'
print(memRound)

avail = memIns.available
avail_a = avail/1024**3
availRound = f'{round(avail_a)} GB'

time = time.strftime('%X %x %Z')
doc_cpu = [{"cpu_time" : time,"cpu_percent" : cpuIns,"cpu_Work":cpuWork, "cpu_freq": cpu_freq,"cpu_count":cpu_count}]
doc_mem  = [{"mem_time" : time,"mem_percent":memIns.percent, "mem_total": memRound, "mem_avail": availRound}]
col_cpu.insert_many(doc_cpu)
col_mem.insert_many(doc_mem)
print(col_cpu.inserted_ids)
print(col_mem.inserted_ids)
