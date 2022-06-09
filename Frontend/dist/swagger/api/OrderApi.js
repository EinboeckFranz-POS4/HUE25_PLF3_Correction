"use strict";
/**
 * BikeStore
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderApi = void 0;
const $ = __importStar(require("jquery"));
const configuration_1 = require("../configuration");
/* tslint:disable:no-unused-variable member-ordering */
class OrderApi {
    constructor(basePath, configuration, defaultExtraJQueryAjaxSettings) {
        this.basePath = 'http://localhost';
        this.defaultHeaders = [];
        this.defaultExtraJQueryAjaxSettings = undefined;
        this.configuration = new configuration_1.Configuration();
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
        }
        if (defaultExtraJQueryAjaxSettings) {
            this.defaultExtraJQueryAjaxSettings = defaultExtraJQueryAjaxSettings;
        }
    }
    extendObj(objA, objB) {
        for (let key in objB) {
            if (objB.hasOwnProperty(key)) {
                objA[key] = objB[key];
            }
        }
        return objA;
    }
    /**
     *
     * @param storeId
     * @param modelsOrderItemReplayDto
     */
    orderPost(storeId, modelsOrderItemReplayDto, extraJQueryAjaxSettings) {
        let localVarPath = this.basePath + '/Order';
        let queryParameters = {};
        let headerParams = {};
        if (storeId !== null && storeId !== undefined) {
            queryParameters['storeId'] = storeId;
        }
        localVarPath = localVarPath + "?" + $.param(queryParameters);
        // to determine the Content-Type header
        let consumes = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        // to determine the Accept header
        let produces = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        headerParams['Content-Type'] = 'application/json';
        let requestOptions = {
            url: localVarPath,
            type: 'POST',
            headers: headerParams,
            processData: false
        };
        requestOptions.data = JSON.stringify(modelsOrderItemReplayDto);
        if (headerParams['Content-Type']) {
            requestOptions.contentType = headerParams['Content-Type'];
        }
        if (extraJQueryAjaxSettings) {
            requestOptions = Object.assign(requestOptions, extraJQueryAjaxSettings);
        }
        if (this.defaultExtraJQueryAjaxSettings) {
            requestOptions = Object.assign(requestOptions, this.defaultExtraJQueryAjaxSettings);
        }
        let dfd = $.Deferred();
        $.ajax(requestOptions).then((data, textStatus, jqXHR) => dfd.resolve({ response: jqXHR, body: data }), (xhr, textStatus, errorThrown) => dfd.reject({ response: xhr, errorThrown: errorThrown }));
        return dfd.promise();
    }
}
exports.OrderApi = OrderApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJBcGkuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzd2FnZ2VyL2FwaS9PcmRlckFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7R0FVRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHSCwwQ0FBNEI7QUFHNUIsb0RBQWlEO0FBRWpELHVEQUF1RDtBQUd2RCxNQUFhLFFBQVE7SUFNakIsWUFBWSxRQUFpQixFQUFFLGFBQTZCLEVBQUUsOEJBQW1EO1FBTHZHLGFBQVEsR0FBRyxrQkFBa0IsQ0FBQztRQUNqQyxtQkFBYyxHQUFrQixFQUFFLENBQUM7UUFDbkMsbUNBQThCLEdBQXdCLFNBQVMsQ0FBQztRQUNoRSxrQkFBYSxHQUFrQixJQUFJLDZCQUFhLEVBQUUsQ0FBQztRQUd0RCxJQUFJLFFBQVEsRUFBRTtZQUNWLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxhQUFhLEVBQUU7WUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztTQUN0QztRQUNELElBQUksOEJBQThCLEVBQUU7WUFDaEMsSUFBSSxDQUFDLDhCQUE4QixHQUFHLDhCQUE4QixDQUFDO1NBQ3hFO0lBQ0wsQ0FBQztJQUVPLFNBQVMsQ0FBbUMsSUFBUSxFQUFFLElBQVE7UUFDbEUsS0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUU7WUFDbEIsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3pCO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFNBQVMsQ0FBQyxPQUFnQixFQUFFLHdCQUEyRCxFQUFFLHVCQUE0QztRQUl4SSxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUU1QyxJQUFJLGVBQWUsR0FBUSxFQUFFLENBQUM7UUFDOUIsSUFBSSxZQUFZLEdBQVEsRUFBRSxDQUFDO1FBQzNCLElBQUksT0FBTyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQzNDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBZ0IsT0FBTyxDQUFDO1NBQ3JEO1FBRUQsWUFBWSxHQUFHLFlBQVksR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM3RCx1Q0FBdUM7UUFDdkMsSUFBSSxRQUFRLEdBQWE7WUFDckIsa0JBQWtCO1lBQ2xCLFdBQVc7WUFDWCxxQkFBcUI7U0FDeEIsQ0FBQztRQUVGLGlDQUFpQztRQUNqQyxJQUFJLFFBQVEsR0FBYTtZQUNyQixZQUFZO1lBQ1osa0JBQWtCO1lBQ2xCLFdBQVc7U0FDZCxDQUFDO1FBR0YsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLGtCQUFrQixDQUFDO1FBRWxELElBQUksY0FBYyxHQUF1QjtZQUNyQyxHQUFHLEVBQUUsWUFBWTtZQUNqQixJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxZQUFZO1lBQ3JCLFdBQVcsRUFBRSxLQUFLO1NBQ3JCLENBQUM7UUFFRixjQUFjLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUMvRCxJQUFJLFlBQVksQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUM5QixjQUFjLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM3RDtRQUVELElBQUksdUJBQXVCLEVBQUU7WUFDekIsY0FBYyxHQUFTLE1BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLHVCQUF1QixDQUFDLENBQUM7U0FDbEY7UUFFRCxJQUFJLElBQUksQ0FBQyw4QkFBOEIsRUFBRTtZQUNyQyxjQUFjLEdBQVMsTUFBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUM7U0FDOUY7UUFFRCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUdqQixDQUFDO1FBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQ3ZCLENBQUMsSUFBcUIsRUFBRSxVQUFrQixFQUFFLEtBQWdCLEVBQUUsRUFBRSxDQUM1RCxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsRUFDOUMsQ0FBQyxHQUFjLEVBQUUsVUFBa0IsRUFBRSxXQUFtQixFQUFFLEVBQUUsQ0FDeEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQzVELENBQUM7UUFDRixPQUFPLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN6QixDQUFDO0NBRUo7QUEvRkQsNEJBK0ZDIn0=