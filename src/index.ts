import Alidns20150109, { DescribeDomainRecordsRequest, AddDomainRecordRequest, UpdateDomainRecordRequest } from '@alicloud/alidns20150109';
import type { DescribeDomainRecordsResponse } from '@alicloud/alidns20150109';
import { Config } from '@alicloud/openapi-client';
import Console from '@alicloud/tea-console';
import Util, { RuntimeOptions } from '@alicloud/tea-util';
import { toMap } from '@alicloud/tea-typescript';

export default class Client {

  static createClient(accessKeyId: string, accessKeySecret: string, endpoint: string): Alidns20150109 {
    const config = new Config({
      accessKeyId,
      accessKeySecret,
    });
    config.endpoint = endpoint;
    return new Alidns20150109(config);
  }

  static async describeDomainRecords(client: Alidns20150109, domainName: string, RRKeyWord: string, type: string, line: string): Promise<DescribeDomainRecordsResponse> {
    const describeDomainRecordsRequest = new DescribeDomainRecordsRequest({
      domainName,
      RRKeyWord,
      type,
      line
    });
    const runtime = new RuntimeOptions({});
    return await client.describeDomainRecordsWithOptions(describeDomainRecordsRequest, runtime);
  }

  static async addDomainRecord(client: Alidns20150109, domainName: string, value: string, RR: string, type: string, line: string, TTL: string = '600'): Promise<void> {
    const addDomainRecordRequest = new AddDomainRecordRequest({
      domainName,
      value,
      RR,
      type,
      TTL,
      line
    });
    const runtime = new RuntimeOptions({});
    try {
      const resp = await client.addDomainRecordWithOptions(addDomainRecordRequest, runtime);
      Console.log(Util.toJSONString(toMap(resp)));
    } catch (error: any) {
      Console.log(error.message);
    }
  }

  static async updateDomainRecord(client: Alidns20150109, recordId: string, value: string, RR: string, type: string, line: string, TTL: string = '600'): Promise<void> {
    const updateDomainRecordRequest = new UpdateDomainRecordRequest({
      recordId,
      value,
      RR,
      type,
      TTL,
      line
    });
    const runtime = new RuntimeOptions({});
    try {
      const resp = await client.updateDomainRecordWithOptions(updateDomainRecordRequest, runtime);
      Console.log(Util.toJSONString(toMap(resp)));
    } catch (error: any) {
      Console.log(error.message);
    }
  }

  static async main(args: any): Promise<void> {
    const accessKeyId = args.accessKeyId || args.i;
    const accessKeySecret = args.accessKeySecret || args.s;
    const endpoint = args.endpoint || args.e || 'dns.aliyuncs.com';

    const domainName = args.domainName || args.d;
    const value = args.value || args.v;
    const RR = args.RR || args.r || '*';
    const type = args.type || args.t || 'A';
    const line = args.line || args.l || 'default';
    const TTL = args.TTL || args.ttl || '600';

    const client = Client.createClient(accessKeyId, accessKeySecret, endpoint);

    const resp = await Client.describeDomainRecords(client, domainName, RR, type, line);
    const record = resp.body.domainRecords?.record
    if(!record) {
      Console.log("获取解析记录列表失败！");
      return ;
    }
    if(!record.length) {
      await Client.addDomainRecord(client, domainName, value, RR, type, line, TTL);
      return ;
    }

    const {recordId, value: oldValue} = record[0];
    if (!Util.equalString(value, oldValue as string)) {
      await Client.updateDomainRecord(client, recordId as string, value, RR, type, line, TTL);
    }
    
  }

}
