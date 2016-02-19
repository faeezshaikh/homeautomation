angular.module('starter')

.service('InvoiceService', function($q) {

        function createPdf(invoice) {
            return $q(function (resolve, reject) {
                var dd = createDocumentDefinition(invoice);
                var pdf = pdfMake.createPdf(dd);

                pdf.getBase64(function (output) {
                    resolve(base64ToUint8Array(output));
                });
            });
        }

        return {
            createPdf: createPdf
        };

    function createDocumentDefinition(invoice) {


        var dd = {
    			content: [
    				'First paragraph',
    				'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
    			]
    		}

        return dd;
    }

    function base64ToUint8Array(base64) {
        var raw = atob(base64);
        var uint8Array = new Uint8Array(raw.length);
        for (var i = 0; i < raw.length; i++) {
            uint8Array[i] = raw.charCodeAt(i);
        }
        return uint8Array;
    }
    });
